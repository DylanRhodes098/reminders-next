// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
// ─────────────────────────────────────────────────────────────────────────────
// Interface
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Zod-based Tool Definition
 *
 * This module provides a TypeScript-idiomatic way to define tools using Zod schemas.
 * It's the TypeScript equivalent of Python's @register_tool decorator.
 *
 * Key features:
 * - Type-safe argument validation at runtime
 * - Automatic JSON Schema generation from Zod schemas
 * - Tag-based categorization for filtering
 * - Terminal flag for tools that end the agent loop
 *
 * @example
 * ```typescript
 * import { z } from 'zod';
 * import { defineTool } from './defineTool';
 *
 * const readFile = defineTool({
 *   name: 'readFile',
 *   description: 'Reads the contents of a file',
 *   schema: z.object({
 *     fileName: z.string().describe('The name of the file to read'),
 *   }),
 *   tags: ['file_operations', 'read'],
 *   execute: async ({ fileName }) => {
 *     return fs.readFileSync(fileName, 'utf-8');
 *   },
 * });
 * ```
 */

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ============================================================================= //
// Imports
// ============================================================================= //

import { z, ZodObject } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { Tool, ToolParameters } from '../../coreFunctionality/llm/Tool';

// ============================================================================= //
// Tool skeleton 
// ==================================================

// ─────────────────────────────────────────────────────────────────────────────
// Define tool definition interface using zod //
// ─────────────────────────────────────────────────────────────────────────────
// The following schema must be an object //
export interface ToolDefinition<TSchema extends ZodObject<any>> {
  /** Unique identifier for the tool */
  name: string;

  /** Human-readable description (shown to the LLM) */
  description: string;

  /** Zod schema defining the expected arguments */
  schema: TSchema;

  /** Tags for categorization and filtering */
  tags?: string[];

  /** If true, calling this tool ends the agent loop */
  terminal?: boolean;

  // Function to execute when the tool is called //
  // input Tschema object in the fomr of typescript, output unkown // 
  execute: (args: z.infer<TSchema>) => unknown | Promise<unknown>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Define register tool interface using zod. //
// ─────────────────────────────────────────────────────────────────────────────
// The following schema must be an object //
export interface RegisteredTool<TSchema extends ZodObject<any>> {
  /** Tool name */
  name: string;

  /** Tool description */
  description: string;

  /** Original Zod schema */
  schema: TSchema;

  /** Tags for categorization */
  tags: string[];

  /** Whether this tool terminates the agent loop */
  terminal: boolean;

  /** The Tool object (for OpenAI API) */
  tool: Tool;

  /** JSON Schema representation of parameters */
  jsonSchema: ToolParameters;

  // Validates arguments against the schema // 
  // Input arguments -> Validate the arguments, is it an object? Does it match the schema? (throw an error if not an object) -> output RegisteredTool object //
  validate: (args: unknown) => z.infer<TSchema>;

 // Function to execute when the tool is called //
  // input Tschema object in the form of typescript, output unkown // 
  execute: (args: z.infer<TSchema>) => unknown | Promise<unknown>;


   // Validates and executes in one call //
  run: (args: unknown) => Promise<unknown>;
}

// ============================================================================= //
// Tool subFunctions
// ============================================================================= //

/** Global registry of all defined tools */
// An object with all the name of tools (key) and any resgiestered tool regardless of its content/shape (value) //
// any is the data type in the object and in this case can be any data type // 
const globalTools: Map<string, RegisteredTool<any>> = new Map();

// Index of tools by tag for efficient filtering */
// An object with all the name of tools (key) and an array of strings // 
const toolsByTag: Map<string, Set<string>> = new Map();

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Gets a tool from the global registry
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// input the tool name // 
export function getGlobalTool(name: string)

// output any tool, regardless of its shape/contents, or undefined //
: RegisteredTool<any> | undefined {

  // Return the name of the tool in the globalTools array //
  return globalTools.get(name);
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Gets all tools from the global registry
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// output any tool, regardless of its shape/contents //
export function getAllGlobalTools(): RegisteredTool<any>[] {

  // return an array of all the tools values //
  return Array.from(globalTools.values());
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Gets all tools names that have a specific tag
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Input tag name //
export function getToolNamesByTag(tag: string)

// ouput an array //
: string[] {

  // return an array of the tools name and its tags, else rturn an emptry array //
  return Array.from(toolsByTag.get(tag) ?? []);
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Clears the global registry 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Outut nothing //
export function clearGlobalRegistry(): void {

  // Clear globasl tools //
  globalTools.clear();

  // Clear tags //
  toolsByTag.clear();
}

// ============================================================================= //
// Zod to json conversion 
// ============================================================================= //

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Converts zod schema into readable and usable json
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Input a zod schema // 
function zodSchemaToToolParameters(schema: ZodObject<any>)

// output a toolparamater object //
: ToolParameters {
  // Convert using zod-to-json-schema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

// Input any zod schema // 
  const jsonSchema = zodToJsonSchema(schema as any, 
    
    //options
    {
    target: 'openApi3',
    $refStrategy: 'none',
  }

  // output an object with string keys and unkonw values //
) as Record<string, unknown>;

  // Extract just what we need for OpenAI
  // result builds a new object with the same shape as the toolparameter object //
  const result: ToolParameters = {
    type: 'object',
    properties: {},
  };

  // if properties is an object // 
  if (jsonSchema.properties && typeof jsonSchema.properties === 'object') {

    // add jsonSchema.properties to result.properties
    result.properties = jsonSchema.properties as ToolParameters['properties'];
  }

  // if required is an array and the array is more than 0 //
  if (Array.isArray(jsonSchema.required) && jsonSchema.required.length > 0) 
    
    {

      // add required field names to result.required
    result.required = jsonSchema.required as string[];
  }

  return result;
}

// ============================================================================= //
// Main Function
// ============================================================================= /
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Define and register a tool 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// input a zod schema // 
export function defineTool<TSchema extends ZodObject<any>>(

  // input a tool definition object // 
  definition: ToolDefinition<TSchema>
)

// output a registeredtool object // 
: RegisteredTool<TSchema> {

  // define the tool deiftion as the following object //
  const { name, description, schema, tags = [], terminal = false, execute } = definition;

  // Convert Zod schema in deifnition object to JSON Schema //
  const jsonSchema = zodSchemaToToolParameters(schema);

  // Create the Tool object for OpenAI API // 
  const tool = new Tool(name, description, jsonSchema);

  // Create the registered tool // 
  const registeredTool: RegisteredTool<TSchema> = {
    name,
    description,
    schema,
    tags,
    terminal,
    tool,
    jsonSchema,

    validate: (args: unknown) => schema.parse(args),

    execute,

    run: async (args: unknown) => {
      const validated = schema.parse(args);
      return execute(validated);
    },
  };

  // Register globally
  globalTools.set(name, registeredTool);

  // Index by tags
  for (const tag of tags) {
    if (!toolsByTag.has(tag)) {
      toolsByTag.set(tag, new Set());
    }
    toolsByTag.get(tag)!.add(name);
  }

  return registeredTool;
}

// ============================================================================= //
// Create Tools
// ============================================================================= //

/**
 * Creates a standard listFiles tool definition.
 * Note: This is a factory that returns a definition, not a registered tool.
 * Call defineTool() with the result to register it.
 */

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// List files tool 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
export function listFilesDefinition(

  // input the result of the execute function // 
  execute: () => string[] | Promise<string[]>
)

// output the tooldefinition object //  
: ToolDefinition<ZodObject<{}>> {

  // return the following key values //
  return {
    name: 'listFiles',
    description: 'Lists all files in the current directory',
    schema: z.object({}),
    tags: ['file_operations', 'list'],
    execute,
  };
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Read files tool 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
export function readFileDefinition(
  execute: (args: { fileName: string }) => string | Promise<string>
): ToolDefinition<ZodObject<{ fileName: z.ZodString }>> {
  return {
    name: 'readFile',
    description: 'Reads the contents of a file',
    schema: z.object({
      fileName: z.string().describe('The name of the file to read'),
    }),
    tags: ['file_operations', 'read'],
    execute,
  };
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// terminate tool 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
export function terminateDefinition(
  execute: (args: { message: string }) => string | Promise<string> = ({ message }) => message
): ToolDefinition<ZodObject<{ message: z.ZodString }>> {
  return {
    name: 'terminate',
    description: 'Ends the conversation and provides final output to the user',
    schema: z.object({
      message: z.string().describe('Final message to display to the user'),
    }),
    tags: ['system'],
    terminal: true,
    execute,
  };
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// A tool registry is a sub-toolbox for specific tools, organised by tags //

// USECASE // 

// Navigate = Load tools, add tools, delete tools from the global registry by tags or names
// ⥥
// Execution = Execute tools with validation
// ⥥
// Debugging = Parse tools in strings and arrays, easier for debugging //
// ⥥
// Creating = Create new toolregistries

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ============================================================================= //
// Imports
// ============================================================================= //

import { Tool } from '../../coreFunctionality/llm/Tool';
import {
  RegisteredTool,
  getAllGlobalTools,
} from './defineTool';

// ============================================================================= //
// ToolRegistry Skeleton
// ============================================================================= //

// ─────────────────────────────────────────────────────────────────────────────
// Interface
// ─────────────────────────────────────────────────────────────────────────────
export interface ToolRegistryOptions {
  /** Only include tools with at least one of these tags */
  tags?: string[];

  /** Only include tools with these specific names */
  names?: string[];

  /** If true, run terminate after the tool finishes  */
  includeTerminate?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Class
// ─────────────────────────────────────────────────────────────────────────────

export class ToolRegistry {

  // Tools is a key as tool name ad value is the RegisteredTool object //
  private readonly tools: Map<string, RegisteredTool<any>> = new Map();

  // ─────────────────────────────────────────────────────────────────────────────
  // A consturctor that craetes a new toolregistry 
  // ─────────────────────────────────────────────────────────────────────────────

  // input the ToolRegistryOptions object // 
  constructor(options: ToolRegistryOptions = {}) {

    // where options has to include tags, names, and a false boolean //  
    const { tags, names, includeTerminate = false } = options;

// ============================================================================= //
// Navigation
// ============================================================================= //
  
    // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
    // Get all global tools
    // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
    // Get all global tools
    const allTools = getAllGlobalTools();

    // loop through the tools // 
    for (const tool of allTools) {

      let include = false;

      // If names and name length is more than 0 // 
      if (names && names.length > 0) {

        // if name includes a tool name //
        if (names.includes(tool.name)) {

          // include the tool in global tools //
          include = true;
        }
      }

      // if tags and tag length is more than 0 // 
      if (tags && tags.length > 0) {

        // does a tool have a tag //
        const hasMatchingTag = tool.tags.some(t => tags.includes(t));

        // if a tool does have a tag //
        if (hasMatchingTag) {

        // include the tool in global tools //
          include = true;
        }
      }

      // If neither specified, include all
      if (!names && !tags) {
        include = true;
      }

      // if the tool is a terminate function, or terminates after use //
      if (includeTerminate && tool.name === 'terminate') {

        // include in global tools //
        include = true;
      }

      // if include is false (if the tool is not in tools) //
      if (include) {

        // add the tool to the tools array (not the global registry), with the name and the tool object //
        this.tools.set(tool.name, tool);
      }
    }
  }

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Add newly regsitered tool to tool array //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // input a regsitered tool // 
  register(tool: RegisteredTool<any>)
  
  // output the updated class object // 
  : this {

    // add the registered tool to the tool array // 
    this.tools.set(tool.name, tool);

    // return the updated class pbject //
    return this;
  }

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Remove tool from registry //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  unregister(name: string)
  
  // output a boolean //
  : boolean {

    // Delet the tool by name //
    return this.tools.delete(name);
  }

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Get a registered tool by name //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// input name of the tool // 
  get(name: string)
  
  // output the registredtool or underfined //
  : RegisteredTool<any> | undefined {

    // map through the tools array and return the RegisteredTool // 
    return this.tools.get(name);
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Check if tool is registered //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  has(name: string): boolean {
    return this.tools.has(name);
  }

    // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Gets all registered tools //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  getAll(): RegisteredTool<any>[] {
    return Array.from(this.tools.values());
  }

    // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Gets all tools names //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  getNames(): string[] {
    return Array.from(this.tools.keys());
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Gets all tool objects, suitable for passing through the llm //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  getTools(): Tool[] {
    return this.getAll().map(t => t.tool);
  }

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Gets the number of registered tools //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  get size(): number {
    return this.tools.size;
  }

  // ============================================================================= //
  // Execution // 
  // ============================================================================= //

 // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Validate the tool //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // input the tool name and arguments // 
  validate(name: string, args: unknown)
  
  // output anything // 
  : unknown {

    // retrieve the tool // 
    const tool = this.tools.get(name);

    // if there isnt a tool // 
    if (!tool) {

      // throw an error //
      throw new Error(`Unknown tool: ${name}`);
    }

    // else use the validate function in RegisteredTools so that it aligns with the schema // 
    return tool.validate(args);
  }

 // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Validate and execute the tool //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // input the name of the tool and arguments //
  async execute(name: string, args: unknown)
  
  // output unknown //
  : Promise<unknown> {

    // get the tool //
    const tool = this.tools.get(name);

    // throw an error if there isnt a tool //
    if (!tool) {
      throw new Error(`Unknown tool: ${name}`);
    }

    // Validate and execute the tool //
    return tool.run(args);
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Checks if a tool has terminartion 
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //

  // Input the tool // 
  isTerminal(name: string)
  
  // return a boolean // 
  : boolean {

    // get tool //
    const tool = this.tools.get(name);
 
    return tool?.terminal ?? false;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Debugging
  // ─────────────────────────────────────────────────────────────────────────────

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Creates a string representation for debugging.
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  toString(): string {
    const names = this.getNames().join(', ');
    return `ToolRegistry(${this.size} tools: ${names})`;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Returns tool info for debugging 
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  describe(): { name: string; description: string; tags: string[]; terminal: boolean }[] {

    // Return an array of all the tools, to extract key metadata from each tool
    return this.getAll().map(t => ({
      name: t.name,
      description: t.description,
      tags: t.tags,
      terminal: t.terminal,
    }));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Create ToolRegsitry
// ─────────────────────────────────────────────────────────────────────────────

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Create a file operations registry // 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
export function createFileOperationsRegistry()

// output a toolregistry object //
: ToolRegistry {

  // Create a tool registry with... //
  return new ToolRegistry({
    tags: ['file_operations', 'system'],
    includeTerminate: true,
  });
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
 // Creates a ToolRegistry with all registered tools.
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
export function createFullRegistry(): ToolRegistry {
  return new ToolRegistry();
}

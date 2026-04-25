// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

 // Agent Environment
 
 // The Environment is the "E" in GAME (Goals, Actions, Memory, Environment).
 // It represents the world the agent can perceive and affect.
 
 // USECASE // 

 // EXECUTE = Execute actions via the tool registry
 // ⥥
 // RESULT INFO = results with metadata (timestamps, success/error status)
 // ⥥
 // ENV INFO = Provide context about the execution environment

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ============================================================================= //
// Imports 
// ============================================================================= //

import { ToolRegistry } from './ToolRegistry';

// ============================================================================= //
// Enviornment Skeleton
// ============================================================================= //

// ─────────────────────────────────────────────────────────────────────────────
// Interface that returns the action result and meta data on the tool result // 
// ─────────────────────────────────────────────────────────────────────────────

export interface ActionResultEnvelope {
  /** Whether the tool executed successfully (vs threw an error) */
  toolExecuted: boolean;

  /** The result of the tool execution (if successful) */
  result?: unknown;

  /** Error message (if failed) */
  error?: string;

  /** Stack trace (if failed and available) */
  traceback?: string;

  /** When the action was executed */
  timestamp: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Interface for environment // 
// ─────────────────────────────────────────────────────────────────────────────
export interface EnvironmentConfig {
  /** Working directory for file operations */
  workingDirectory?: string;

  /** Additional context passed to tools */
  context?: Record<string, unknown>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Environment Class
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Represents the environment in which an agent operates.
 *
 * The Environment executes actions and wraps results with metadata.
 * It provides a consistent interface for tool execution across the agent system.
 */

export class Environment {
  /** Working directory for file operations */
  public readonly workingDirectory: string;

  /** Additional context available to tools */
  public readonly context: Record<string, unknown>;

// ─────────────────────────────────────────────────────────────────────────────
// Constructor that creates a new envionrment //
// ─────────────────────────────────────────────────────────────────────────────
// input workingdir and contecxt of env // 
  constructor(config: EnvironmentConfig = {}) {

    // if no workingdirectory, add the current dir // 
    this.workingDirectory = config.workingDirectory ?? process.cwd();

    // if no context, add an emptry object //
    this.context = config.context ?? {};
  }

  // ============================================================================= //
  // Tool Execution
  // ============================================================================= //

  /**
   * Executes an action via the tool registry.
   *
   * This method:
   * 1. Looks up the tool in the registry
   * 2. Validates and executes the tool
   * 3. Wraps the result in an ActionResultEnvelope
   *
   * @param registry - The tool registry containing the action
   * @param name - Name of the tool to execute
   * @param args - Arguments for the tool
   * @returns Result envelope with success/error and metadata
   */

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// async function that executes a tool  //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// input ... //
  async executeAction(

    // toolregistry // 
    registry: ToolRegistry,

    // tool name //
    name: string,

    // tool arguments //
    args: Record<string, unknown>
  )
  
  // output the actionresult and metadata // 
  : Promise<ActionResultEnvelope> {

    // define timestamp //
    const timestamp = new Date().toISOString();

    try {
      // if the registry is empty //
      if (!registry.has(name)) {

        // throw an error //
        return {
          toolExecuted: false,
          error: `Unknown tool: ${name}`,
          timestamp,
        };
      }

      // else execute the tool //
      const result = await registry.execute(name, args);

      // return metadata //
      return {
        toolExecuted: true,
        result,
        timestamp,
      };

      // catch any errors //
    } catch (error) {
      // Handle execution errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      const traceback = error instanceof Error ? error.stack : undefined;
      return {
        toolExecuted: false,
        error: errorMessage,
        traceback,
        timestamp,
      };
    }
  }

  /**
   * Executes an action and returns just the result (throws on error).
   *
   * Use this when you want exceptions to propagate rather than
   * being wrapped in an envelope.
   *
   * @param registry - The tool registry
   * @param name - Tool name
   * @param args - Tool arguments
   * @returns The raw result
   * @throws Error if tool not found or execution fails
   */

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Execute tool but just the result //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// input tool // 
  async executeActionRaw(
    registry: ToolRegistry,
    name: string,
    args: Record<string, unknown>
  )
  
  // output anything //
  : Promise<unknown> {

    // if there isnt a tool throw an error //
    if (!registry.has(name)) {
      throw new Error(`Unknown tool: ${name}`);
    }

    // else execute tool //
    return registry.execute(name, args);
  }

  // ============================================================================= //
  // Result info
  // ============================================================================= //

  /**
   * Creates a success result envelope.
   */
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// create success result envelopt //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  static success(result: unknown): ActionResultEnvelope {
    return {
      toolExecuted: true,
      result,
      timestamp: new Date().toISOString(),
    };
  }

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// create error result envelopt //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  static error(message: string, traceback?: string): ActionResultEnvelope {
    return {
      toolExecuted: false,
      error: message,
      traceback,
      timestamp: new Date().toISOString(),
    };
  }

 // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// format result as a string for llm //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  static formatResult(envelope: ActionResultEnvelope): string {
    return JSON.stringify(envelope);
  }

  // ============================================================================= //
  // Environment Info
  // ============================================================================= //


// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// get info on current enviornment //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //

// output object //
  getInfo(): Record<string, unknown> {

    return {
      workingDirectory: this.workingDirectory,

      // What operating system your code is running on //
      platform: process.platform,

      // what version of node your runinning on //
      nodeVersion: process.version,

      // context of env //
      ...this.context,
    };
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Returns a string representation for debugging
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //

  toString(): string {
    return `Environment(${this.workingDirectory})`;
  }
}

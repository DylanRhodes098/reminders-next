
 // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

  // GAME Agent //

 // Goals: What the agent is trying to achieve
 // Actions: Tools the agent can use
 // Memory: Conversation history
 // Environment: Where actions are executed

  // USECASE //
 
 // AGENT FUNCTION = Allows the agent to navigate through each step of GAME //
 // 1. Construct a prompt from GAME components
 // 2. Send to LLM for a decision
 // 3. Parse the response into an action
 // 4. Execute the action in the environment
 // 5. Update memory with results
 // 6. Repeat until termination
 // full memory includes userRequest, LLM Reponse, Action result (from envionrment) // 

  // ⥥

 // PROMPT MANAGEMENT = This creates a prompt using memory (userRequest, previous LLM responses, and environment/action results) // 

  // ⥥

 // RESPONSE MANAGMENT = This handles llm reponse errors, gives the agent the ability to re-request the response //

  // ⥥

 // ACTION EXECUTION = This uses the envionrment to execute the actions in the llm repsonse //

  // ⥥

 // MEMORY MANAGMENT = This adds the latest LLM response and action result to memory
 // so they can be used in the next agent step //

   // ⥥

 // AGENT BUILDER = The ability to build your own agent, or use a simple one // 

 // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ============================================================================= //
// Imports 
// ============================================================================= //

import { Prompt } from '../llm/Prompt';
import { ConversationMemory } from './ConversationMemory';
import { ToolRegistry } from '../../factory/createTools/ToolRegistry';
import { Environment, ActionResultEnvelope } from '../../factory/createTools/Environment';
import {
  AgentLanguage,
  FunctionCallingLanguage,
  Goal,
  ParsedAction,
} from '../../communication/AgentLanguage';

// ============================================================================= //
// Agent skeleton
// ============================================================================= //

/**
 * Function type for generating LLM responses.
 * This abstraction allows different LLM backends to be used.
 */
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// To generate LLMs - inputs a prompt, outputs a string // 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
export type GenerateResponseFn = (prompt: Prompt) => Promise<string>;

// ─────────────────────────────────────────────────────────────────────────────
// Creating an agent // 
// ─────────────────────────────────────────────────────────────────────────────
export interface AgentConfig {
  /** Agent's goals - what it's trying to achieve */
  goals: Goal[];

  /** Language defining how to communicate with the LLM */
  language: AgentLanguage;

  /** Registry of available tools/actions */
  registry: ToolRegistry;

  /** Function to generate LLM responses */
  generateResponse: GenerateResponseFn;

  /** Environment where actions are executed */
  environment?: Environment;

  /** Maximum iterations before forced termination */
  maxIterations?: number;

  /** Maximum retries for parsing errors */
  maxParseRetries?: number;

  /** Enable verbose logging */
  verbose?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Result for each agent step // 
// ─────────────────────────────────────────────────────────────────────────────
export interface AgentStepResult {
  /** The raw LLM response */
  response: string;

  /** The parsed action */
  action: ParsedAction;

  /** The execution result */
  result: ActionResultEnvelope;

  /** Whether this step terminated the agent loop */
  terminated: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Step tracking for each stage of the llm // 
// ─────────────────────────────────────────────────────────────────────────────
export interface AgentCallbacks {
  /** Before sending prompt */
  onBeforePrompt?: (prompt: Prompt, iteration: number) => void;

  /** After llm responds */
  onResponse?: (response: string, iteration: number) => void;

  /** After actions executes */
  onActionExecuted?: (result: AgentStepResult, iteration: number) => void;

  /** If response failed */
  onParseError?: (error: Error, response: string, retriesLeft: number) => void;

  /** Wwhen agent terminates/stops */
  onTerminate?: (memory: ConversationMemory, reason: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Agent Class
// ─────────────────────────────────────────────────────────────────────────────

export class Agent {
  /** Agent's goals */
  public readonly goals: Goal[];

  /** Language for prompt construction and response parsing */
  public readonly language: AgentLanguage;

  /** Registry of available tools */
  public readonly registry: ToolRegistry;

  /** Function to generate LLM responses */
  public readonly generateResponse: GenerateResponseFn;

  /** Environment for action execution */
  public readonly environment: Environment;

  /** Maximum iterations */
  public readonly maxIterations: number;

  /** Maximum parse retries */
  public readonly maxParseRetries: number;

  /** Verbose logging */
  public readonly verbose: boolean;

  /** Optional callbacks */
  public callbacks: AgentCallbacks = {};

// ─────────────────────────────────────────────────────────────────────────────
// Agent Constructor
// ─────────────────────────────────────────────────────────────────────────────

  constructor(config: AgentConfig) {
    this.goals = config.goals;
    this.language = config.language;
    this.registry = config.registry;
    this.generateResponse = config.generateResponse;
    this.environment = config.environment ?? new Environment();
    this.maxIterations = config.maxIterations ?? 50;
    this.maxParseRetries = config.maxParseRetries ?? 3;
    this.verbose = config.verbose ?? false;
  }

  // ============================================================================= //
  // Agent Function
  // ============================================================================= //

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Runs the agent using a user request //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Input... //
  async run(
    // user request //
    userInput: string, 
    
    // optional converstaion history (creates new if not provided) //
    memory?: ConversationMemory)
    
    // return updated converstaion history //
    : Promise<ConversationMemory> {

      // Create new memory // 
    const conversationMemory = memory ?? new ConversationMemory();

    // Add user message // 
    conversationMemory.addUser(userInput);

    // Run the GAME loop
    // Iterations starts at 0 and adds by one until it hits 50 // 
    for (let iteration = 0; iteration < this.maxIterations; iteration++) {

      // log 1 iteration //
      this.log(`\n--- Iteration ${iteration + 1} ---`);

      // Execute 1 step in the agent using user input and iterations // 
      const stepResult = await this.step(conversationMemory, iteration);

      // if the step is a temrination, stop the loop //
      if (stepResult.terminated) {
        this.callbacks.onTerminate?.(conversationMemory, 'terminal_action');
        break;
      }

      // if iterations hits 50, stop the loop //
      if (iteration === this.maxIterations - 1) {
        this.log('Max iterations reached');
        this.callbacks.onTerminate?.(conversationMemory, 'max_iterations');
      }
    }

    // return new conversationmemory // 
    // this includes... //
    // The users request 
    // the llm response //
    // the tool result //
    return conversationMemory;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Executes one step of the GAME loop 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// input conversationmemory and iteration number // 
  async step(memory: ConversationMemory, iteration: number)
  
  // return the llm response //
  : Promise<AgentStepResult> {

    // Build prompt using ConversationMemory //
    const prompt = this.constructPrompt(memory);

    // track step // 
    this.callbacks.onBeforePrompt?.(prompt, iteration);

    // log // 
    this.log('Agent thinking...');

    // Resend prompt for errors //
    const { response, action } = await this.getActionWithRetry(prompt, iteration);

    // track step // 
    this.callbacks.onResponse?.(response, iteration);

    // log // 
    this.log(`Agent Decision: ${response.substring(0, 200)}...`);

    // Execute the action //
    const result = await this.executeAction(action);

    // log //
    this.log(`Action Result: ${JSON.stringify(result).substring(0, 200)}...`);

    // Update memory //
    this.updateMemory(memory, response, result);

    // Check termination //
    const terminated = this.registry.isTerminal(action.tool);

    // Build step result object // 
    const stepResult: AgentStepResult = {
      response,
      action,
      result,
      terminated,
    };

    // track step // 
    this.callbacks.onActionExecuted?.(stepResult, iteration);

    // Return step result //
    return stepResult;
  }

  // ============================================================================= //
  // Prompt Construction
  // ============================================================================= //

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Constructs a prompt from the current GAME state.
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  constructPrompt(memory: ConversationMemory): Prompt {
    return this.language.constructPrompt({
      goals: this.goals,
      actions: this.registry.getTools(),
      memory,
    });
  }

  // ============================================================================= //
  // Response Management
  // ============================================================================= //

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // If the LLM’s response can’t be parsed into an action, the agent asks the LLM for another response //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //

  // input ... // 
  private async getActionWithRetry(

    // prompt //
    prompt: Prompt,

    // iteration number //
    _iteration: number
  )
  
  // output response and action // 
  : Promise<{ response: string; action: ParsedAction }> {

    // prompt // 
    let currentPrompt = prompt;

    // maxretries 
    let retriesLeft = this.maxParseRetries;

    // if retriesLeft is more than 0 // 
    while (retriesLeft > 0) {
      // Get LLM response //
      const response = await this.generateResponse(currentPrompt);

      try {
        // vliadate the response, see if it work //
        const action = this.language.parseResponse(response);

        // return response and action //
        return { response, action };

        // catch if errors //
      } catch (error) {
        retriesLeft--;
        const err = error instanceof Error ? error : new Error(String(error));
        this.log(`Parse error (${retriesLeft} retries left): ${err.message}`);
        this.callbacks.onParseError?.(err, response, retriesLeft);

        // if 0 retries left // 
        if (retriesLeft === 0) {

          // return response and action, and terminate the loop //
          return {
            response,
            action: {
              tool: 'terminate',
              args: { message: `Failed to parse response: ${err.message}` },
            },
          };
        }

        // Create a new response // 
        currentPrompt = this.language.adaptPromptAfterParsingError({
          prompt: currentPrompt, 
          response,
          error: err.message,
          traceback: err.stack,
          retriesLeft,
        });
      }
    }

    // extra error handling layer //
    throw new Error('Unexpected end of retry loop');
  }

  // ============================================================================= //
  // Action Execution
  // ============================================================================= //

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Executes an action in the environment
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // input action // 
  private async executeAction(action: ParsedAction)
  
  // output action result // 
  : Promise<ActionResultEnvelope> {

    // execute action which outputs the result // 
    return this.environment.executeAction(
      this.registry,
      action.tool,
      action.args
    );
  }

  // ============================================================================= //
  // Memory Management
  // ============================================================================= //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Update memory 
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // input... //
  private updateMemory(

    // conversationmemory //
    memory: ConversationMemory,

     // llm response //
    response: string,

     // action result //
    result: ActionResultEnvelope
  )
  // output nothing //
  : void {

    // Add the llm response
    memory.addAssistant(response);

    // Add the environment 
    memory.addEnvironment(JSON.stringify(result));
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Logs a message if verbose mode is enabled.
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  private log(message: string): void {
    if (this.verbose) {
      console.log(`[Agent] ${message}`);
    }
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Returns a string representation for debugging.
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  toString(): string {
    const goalNames = this.goals.map(g => g.name).join(', ');
    return `Agent(goals: [${goalNames}], tools: ${this.registry.size})`;
  }
}

// ============================================================================= //
// Agent builder 
// ============================================================================= //
// ─────────────────────────────────────────────────────────────────────────────
// Create an agent class //
// ─────────────────────────────────────────────────────────────────────────────

export class AgentBuilder {
  private goals: Goal[] = [];
  private language?: AgentLanguage;
  private registry?: ToolRegistry;
  private generateResponse?: GenerateResponseFn;
  private environment?: Environment;
  private maxIterations = 50;
  private maxParseRetries = 3;
  private verboseMode = false;
  private agentCallbacks: AgentCallbacks = {};


  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Adds a goal to the agent.
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  withGoal(name: string, description: string, priority = 0): this {
    this.goals.push({ name, description, priority });
    return this;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Adds multiple goals.
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  withGoals(goals: Goal[]): this {
    this.goals.push(...goals);
    return this;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Sets the agent language.
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  withLanguage(language: AgentLanguage): this {
    this.language = language;
    return this;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Sets the tool registry.
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  withRegistry(registry: ToolRegistry): this {
    this.registry = registry;
    return this;
  }

 // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Sets the response generator function.
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  withGenerateResponse(fn: GenerateResponseFn): this {
    this.generateResponse = fn;
    return this;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Lets the agent ask the llm to egnerate a response // 
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // input the llm (one that can geenrate responses) // 
  withLLM(llm: { generate: (prompt: Prompt) => Promise<string> })
  
  // output the updated agent class builder //  
  : this {

    // When the agent needs a response, call llm.generate(prompt) //
    // This assigns the function the agent uses to generate responses, delegating that work to the LLM //
    // this.generatereponse is the new prompt version //  
    this.generateResponse = (prompt) => llm.generate(prompt);

    // return the agent builder class //
    return this;
  }

 // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Sets the environment.
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  withEnvironment(env: Environment): this {
    this.environment = env;
    return this;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Sets the maximum iterations.
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  withMaxIterations(n: number): this {
    this.maxIterations = n;
    return this;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Sets the maximum parse retries.
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  withMaxParseRetries(n: number): this {
    this.maxParseRetries = n;
    return this;
  }

 // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Enables verbose logging.
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  verbose(enabled = true): this {
    this.verboseMode = enabled;
    return this;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Sets callbacks
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  withCallbacks(callbacks: AgentCallbacks): this {
    this.agentCallbacks = { ...this.agentCallbacks, ...callbacks };
    return this;
  }

    // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Builds the Agent.
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  build()
  
  // output agent //
  : Agent {

    // if no langauge throw error //
    if (!this.language) {
      throw new Error('Agent requires a language (use withLanguage())');
    }

    // if no registry throw error //
    if (!this.registry) {
      throw new Error('Agent requires a registry (use withRegistry())');
    }

    // if no response throw error //
    if (!this.generateResponse) {
      throw new Error('Agent requires a response generator (use withGenerateResponse() or withLLM())');
    }

    // define key value sin agent //
    const agent = new Agent({
      goals: this.goals,
      language: this.language,
      registry: this.registry,
      generateResponse: this.generateResponse,
      environment: this.environment,
      maxIterations: this.maxIterations,
      maxParseRetries: this.maxParseRetries,
      verbose: this.verboseMode,
    });

    agent.callbacks = this.agentCallbacks;


    // return agent //
    return agent;
  }
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Automatically creates a simple agent, rather than manual building //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
export function createSimpleAgent(

  // input llm // 
  llm: { generate: (prompt: Prompt) => Promise<string> },

  // input toolresgistry // 
  registry: ToolRegistry,

  // input goal // 
  goalDescription: string
)

// output an agent //
: Agent {

  // Run the fuctions // 
  return new AgentBuilder()
    .withGoal('Assistant', goalDescription)
    .withLanguage(new FunctionCallingLanguage())
    .withRegistry(registry)
    .withLLM(llm)
    .build();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// Agent Language Abstraction //

// AgentLanguage abstraction controls how an agent communicates with an LLM. //

// USECASE // 

 // 1. BUILD PROMPT = How goals, actions, and memory are formatted into a prompt
  // ⥥
 // 2. CONVERT TO JSON = How the LLM response is parsed into a structured action
  // ⥥
 // 3. REBUILD PROMPT = How parsing errors are handled with retry logic

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ============================================================================= //
// Imports
// ============================================================================= //

import { Message } from '../coreFunctionality/llm/Message';
import { Prompt } from '../coreFunctionality/llm/Prompt';
import { Tool } from '../coreFunctionality/llm/Tool';
import { ConversationMemory } from '../coreFunctionality/agent/ConversationMemory';

// ============================================================================= //
// Language Skeleton
// ============================================================================= //

// ========================================== //
 // Goal
// ========================================== //
export interface Goal {
  /** Unique name for the goal */
  name: string;

  /** Detailed description of what the goal entails */
  description: string;

  /** Priority (lower = higher priority) */
  priority?: number;
}

// ========================================== //
 // Action/tool
// ========================================== //
export interface ParsedAction {
  /** Name of the tool to call */
  tool: string;

  /** Arguments to pass to the tool */
  args: Record<string, unknown>;
}

// ========================================== //
 // Prompt buider info 
// ========================================== //
export interface PromptContext {
  /** Agent's goals */
  goals: Goal[];

  /** Available tools/actions */
  actions: Tool[];

  /** Conversation memory */
  memory: ConversationMemory;
}

// ========================================== //
 // Prompt error handling
// ========================================== //
export interface ErrorContext {
  /** The original prompt */
  prompt: Prompt;

  /** The raw LLM response that failed to parse */
  response: string;

  /** Error message */
  error: string;

  /** Stack trace if available */
  traceback?: string;

  /** Number of retries remaining */
  retriesLeft: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Language Class
// ─────────────────────────────────────────────────────────────────────────────

export abstract class AgentLanguage {

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Prompt builder  // 
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  abstract constructPrompt(context: PromptContext)
  
  // output a prompt 
  : Prompt;

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Convert llm response into a usable tool/action
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  abstract parseResponse(response: string)
  
   // output parsedaction //
  : ParsedAction;

   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Create new prompt to send back to the llm if first response is an error, to help llm correct itself //  
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  adaptPromptAfterParsingError(context: ErrorContext)
  
  // ouput a prompt // 
  : Prompt {

    // return the original prompt // 
    return context.prompt;
  }

  // ============================================================================= //
  // subFunctions
  // ============================================================================= //

    // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // create a system prompt using goals //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // input goal array // 
  protected formatGoals(goals: Goal[])
  
  // output a message array //
  : Message {

    // map through all the goals // 
    const sorted = [...goals]
    
    // return goals that have a lower priority first //
    .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

    // a string // 
    const sep = '\n-------------------\n';

    // map through sorted goals
    const goalText = sorted.map(g => 
      
      // return the name, followed by a string, followed by description // 
      `${g.name}:${sep}${g.description}${sep}`)

      // add a string on the end //
      .join('\n\n');

      // Create a system prompt using goals // 
    return Message.system(goalText);
  }

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Converts conversation memory to messages.
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// input converstaionmemory object //
  protected formatMemory(memory: ConversationMemory)
  
  // output message hostory // 
  : Message[] {

    // get all messages // 
    const items = memory.getItems();

    // map throgh the messages 
    return items.map(item => {

      // return the message content //
      const content = item.content;

      // if the type in item is... // 
      switch (item.type) {

        // an assistant // 
        case 'assistant':

        // convert to an assitant message // 
          return Message.assistant(content);

        case 'environment':

        // convert to an assitant message // 
          return Message.assistant(content);

        case 'system':

        // convert to a system prompt // 
          return Message.system(content);

        default:

        // convert to a user message //
          return Message.user(content);
      }
    });
  }
}

// ============================================================================= //
// LLM
// ============================================================================= //

// ─────────────────────────────────────────────────────────────────────────────
// No tool LLM 
// ─────────────────────────────────────────────────────────────────────────────
export class NaturalLanguage extends AgentLanguage {

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Build a prompt wihtout tools 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  constructPrompt(context: PromptContext)
  
  // output prompt //
  : Prompt {

    // context = goals an memory //
    const { goals, memory } = context;

    // messages = message array //
    const messages: Message[] = [];

    // if goals exists //
    if (goals.length > 0) {

      // map through goals, and return their description as a list //
      const goalText = goals.map(g => g.description).join('\n');
      
            // add a new system prompt using goal description to the message array //
      messages.push(Message.system(goalText));
    }

    // Add prompt to message history // 
    messages.push(...this.formatMemory(memory));

    // No tools - this is pure conversation // 
    // return a new prompt with the newly built message, followed by an empty array // 
    return new Prompt(messages, []);
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Terminates the llm once it has given a single response, treat any response as the final answer //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // input user response // 
  parseResponse(response: string)
  
  // output tool //
  : ParsedAction {

    // Any response terminates - this is simple Q&A //
    // return temrinate tool // 
    return {
      tool: 'terminate',
      args: { message: response },
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// manually converts the response into usable actions LLM 
// ─────────────────────────────────────────────────────────────────────────────

// Format for ```action blocks. //
const ACTION_FORMAT = `
<Stop and think step by step. Insert a rich description of your step by step thoughts here.>

\`\`\`action
{
    "tool": "tool_name",
    "args": {...fill in any required arguments here...}
}
\`\`\``;

export class JsonActionLanguage extends AgentLanguage {

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Make prompt 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // input PromptContext pbject //
  constructPrompt(context: PromptContext)
  
  // output prompt // 
  : Prompt {

    // define context using goals, tool and memory // 
    const { goals, actions, memory } = context;

    // define message array // 
    const messages: Message[] = [];

    // Add goals as system prompt
    if (goals.length > 0) {
      messages.push(this.formatGoals(goals));
    }

    // Add actions as system prompt
    if (actions.length > 0) {
      messages.push(this.formatActions(actions));
    }

    // Add memory
    messages.push(...this.formatMemory(memory));

    // No OpenAI tools - we're using text-based action blocks
    // create a new prompt using newly made message array //
    return new Prompt(messages, []);
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// input llm response // 
  parseResponse(response: string)
  
  // output parsed action //
  : ParsedAction {

    // define start and end marker // 
    const startMarker = '```action';
    const endMarker = '```';

  // Find where the action block starts // 
    const trimmed = response.trim();
    const startIndex = trimmed.indexOf(startMarker);

    // if startindex is -1, throw an error //
    if (startIndex === -1) {
      throw new Error(`Response does not contain an \`\`\`action block`);
    }

    // Find the closing ``` after the start marker //
    const afterStart = startIndex + startMarker.length;
    const endIndex = trimmed.indexOf(endMarker, afterStart);

        // if startindex is -1, throw an error //
    if (endIndex === -1) {
      throw new Error(`Response has unclosed \`\`\`action block`);
    }

    // return just the action block //
    const jsonContent = trimmed.slice(afterStart, endIndex).trim();

    try {

      // convert action bloack into json // 
      const parsed = JSON.parse(jsonContent);

      // if tool isnt a string, throw an error //
      if (typeof parsed.tool !== 'string') {
        throw new Error('Parsed action missing "tool" field');
      }

      // else return tool //
      return {
        tool: parsed.tool,
        args: parsed.args ?? {},
      };

      // catch //
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to parse action JSON: ${message}`);
    }
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// 
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// input error context // 
  adaptPromptAfterParsingError(context: ErrorContext)
  
  // output prompt // 
  : Prompt {

    // context is the prompt, llm response and error message //
    const { prompt, response, error } = context;

    // Add the failed response and error feedback //
    const newMessages = [
      ...prompt.messages,
      Message.assistant(response),
      Message.user(
        `Your last output did not contain a valid \`\`\`action block that could be parsed.\n` +
        `Error: ${error}\n\n` +
        `Please fix your prior response.\n` +
        `Make sure that it has the correct format:\n` +
        ACTION_FORMAT
      ),
    ];

    // create a new prompt using th error message, tool and metadata //
    return new Prompt(newMessages, prompt.tools, prompt.metadata);
  }

 // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Formats actions into a system message with JSON descriptions.
   // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  private formatActions(actions: Tool[]): Message {
    const actionDescriptions = actions.map(action => ({
      name: action.name,
      description: action.description,
      args: action.parameters,
    }));

    const content = `
Available Tools: ${JSON.stringify(actionDescriptions, null, 2)}

When you are done, terminate the conversation by using the "terminate" tool and I will
provide the results to the user.

Important!!! Every response MUST have an action.
You must ALWAYS respond in this format:

${ACTION_FORMAT}
`;

    return Message.system(content);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FunctionCallingLanguage Implementation LLM (llm that uses tools and openai to convert)
// ─────────────────────────────────────────────────────────────────────────────
export class FunctionCallingLanguage extends AgentLanguage {

  // Input promptcontext 
  constructPrompt(context: PromptContext)
  
  // output prompt // 
  : Prompt {

    // define context as goals, tools, memory //
    const { goals, actions, memory } = context;

    // define message array //
    const messages: Message[] = [];

    // Add goals as system prompt //
    if (goals.length > 0) {
      messages.push(this.formatGoals(goals));
    }

    // Add memory // 
    messages.push(...this.formatMemory(memory));

    // Include message (system prompt, user prompt) and tools //
    return new Prompt(messages, actions);
  }

  // input llm response (LLM.generate())// 
  parseResponse(response: string)
  
  // output parsed action //
  : ParsedAction {

    try {
      // return JSON for tool calls
      const parsed = JSON.parse(response);

      // if the tool is a string // 
      if (typeof parsed.tool === 'string') {

        // turn string into json //
        return {
          tool: parsed.tool,
          args: parsed.args ?? {},
        };
      }

      // If there arent any tools, terminate // 
      return {
        tool: 'terminate',
        args: { message: response },
      };

      // catch errors //
    } catch {
      // Non-JSON response means the LLM responded with text
      return {
        tool: 'terminate',
        args: { message: response },
      };
    }
  }
}

// ============================================================================= //
// subFunctions
// ============================================================================= //

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Create a goal //
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
export function createGoal(name: string, description: string, priority = 0): Goal {
  return { name, description, priority };
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
// Extracts a code block from a string.
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
export function extractCodeBlock(text: string, language: string): string | null {
  const startMarker = '```' + language;
  const endMarker = '```';

  const trimmed = text.trim();
  const startIndex = trimmed.indexOf(startMarker);

  if (startIndex === -1) {
    return null;
  }

  const afterStart = startIndex + startMarker.length;
  const endIndex = trimmed.indexOf(endMarker, afterStart);

  if (endIndex === -1) {
    return null;
  }

  return trimmed.slice(afterStart, endIndex).trim();
}

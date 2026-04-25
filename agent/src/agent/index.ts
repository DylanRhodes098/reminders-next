/**
 * Shared module exports.
 *
 * This barrel file re-exports all shared types and classes for convenient importing.
 *
 * @example
 * ```typescript
 * import { Message, LLM, Action, Tool } from '.';
 * ```
 */

export { loadEnv, requireEnv, getEnv } from './coreFunctionality/env';

// Core types
export { Message, Role } from './coreFunctionality/llm/Message';
export { Action, ToolArgs } from './communication/Action';
export { ActionResult } from './communication/ActionResult';
export { Tool, ToolParameters } from './coreFunctionality/llm/Tool';
export { Prompt, PromptMetadata } from './coreFunctionality/llm/Prompt';
export { Memory } from './coreFunctionality/agent/Memory';
export { Goal } from './coreFunctionality/Goal';
export { LLM, LLMConfig, ToolCallResponse } from './coreFunctionality/llm/LLM';
export { FileTools } from './coreFunctionality/agent/FileTools';

// New GAME framework components
export { ConversationMemory, MemoryItem, MemoryItemType } from './coreFunctionality/agent/ConversationMemory';
export { Environment, ActionResultEnvelope, EnvironmentConfig } from './factory/createTools/Environment';
export {
  AgentLanguage,
  NaturalLanguage,
  JsonActionLanguage,
  FunctionCallingLanguage,
  Goal as AgentGoal,
  ParsedAction,
  PromptContext,
  ErrorContext,
  createGoal,
  extractCodeBlock,
} from './communication/AgentLanguage';
export {
  Agent,
  AgentBuilder,
  AgentConfig,
  AgentStepResult,
  AgentCallbacks,
  GenerateResponseFn,
  createSimpleAgent,
} from './coreFunctionality/agent/Agent';

// Zod-based tool definition
export {
  defineTool,
  ToolDefinition,
  RegisteredTool,
  getGlobalTool,
  getAllGlobalTools,
  getToolNamesByTag,
  clearGlobalRegistry,
  listFilesDefinition,
  readFileDefinition,
  terminateDefinition,
} from './factory/createTools/defineTool';
export {
  ToolRegistry,
  ToolRegistryOptions,
  createFileOperationsRegistry,
  createFullRegistry,
} from './factory/createTools/ToolRegistry';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Defines communication between the Agent and LLM //

// communication/AgentLanguage.ts // 

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
  
// - - - // - - - //
// Agent-related enums (plain constants, not Sequelize models)
// - - - // - - - //

export const MessageRole = Object.freeze({
  SYSTEM: "system",
  USER: "user",
  ASSISTANT: "assistant",
  TOOL: "tool",
});

export const RunStatus = Object.freeze({
  QUEUED: "queued",
  RUNNING: "running",
  WAITING_TOOL: "waiting_tool",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
  TIMED_OUT: "timed_out",
});

export const ToolCallStatus = Object.freeze({
  PENDING: "pending",
  RUNNING: "running",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
  CANCELLED: "cancelled",
  TIMED_OUT: "timed_out",
});

export const ErrorSource = Object.freeze({
  LLM: "llm",
  TOOL: "tool",
  MEMORY: "memory",
  POLICY: "policy",
  SYSTEM: "system",
});

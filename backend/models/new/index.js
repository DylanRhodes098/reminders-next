import sequelize from "../../lib/db.js";

import AgentConfig from "./agentConfig.js";
import LlmConfig from "./llmConfig.js";
import AgentStep from "./agentStep.js";

import Language from "./agentConfig/language.js";
import ToolRegistry from "./agentConfig/toolRegistry.js";
import UserRequest from "./agentConfig/userRequest.js";
import Environment from "./agentConfig/environment.js";
import Tools from "./agentConfig/tools.js";
import Goal from "./agentConfig/prompt/communication/goal.js";
import Memory from "./agentConfig/prompt/communication/memory.js";
import Actions from "./agentConfig/prompt/communication/actions.js";
import AgentConfigPromptCommunicationMessages from "./agentConfig/prompt/communication/messages.js";
import BuildPromptToLlm from "./agentConfig/prompt/buildPromptToLlm.js";
import ReceivePromptFromLlm from "./agentConfig/prompt/receivePromptFromLlm.js";
import AgentConfigPromptBuildResponseToUser from "./agentConfig/prompt/buildResponseToUser.js";
import ToolParameters from "./agentConfig/prompt/toolParameters.js";
import Properties from "./agentConfig/prompt/toolParameters/properties.js";
import ToolTags from "./agentConfig/prompt/toolTags.js";
import ToolResult from "./agentConfig/prompt/toolResult.js";
import AgentConfigPromptToolCallsRequest from "./agentConfig/prompt/toolCallsRequest.js";
import AgentConfigToolExecutions from "./agentConfig/toolExecutions.js";

import PromptOutput from "./llmConfig/promptOutput.js";
import PromptInput from "./llmConfig/promptInput.js";
import MetaData from "./llmConfig/prompt/metaData.js";
import LlmConfigPromptMessages from "./llmConfig/prompt/messages.js";
import LlmConfigPromptToolCallsRequest from "./llmConfig/prompt/toolCallsRequest.js";

import Input from "./agentStepConfig/input.js";
import BuiltPromptToLlm from "./agentStepConfig/builtPromptToLlm.js";
import LlmResponse from "./agentStepConfig/llmResponse.js";
import AgentStepBuildResponseToUser from "./agentStepConfig/buildResponseToUser.js";
import StateUpdate from "./agentStepConfig/stateUpdate.js";
import Action from "./agentStepConfig/communication/action.js";
import AgentStepToolExecutions from "./agentStepConfig/toolExecutions.js";

// --- AGENT ---

if (!AgentConfig.associations?.goals)
  AgentConfig.hasMany(Goal, {
    foreignKey: "agentConfigId",
    as: "goals",
  });

if (!Goal.associations?.agentConfig)
  Goal.belongsTo(AgentConfig, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!AgentConfig.associations?.language)
  AgentConfig.hasOne(Language, {
    foreignKey: "agentConfigId",
    as: "language",
  });

if (!Language.associations?.agentConfig)
  Language.belongsTo(AgentConfig, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!AgentConfig.associations?.toolRegistry)
  AgentConfig.hasOne(ToolRegistry, {
    foreignKey: "agentConfigId",
    as: "toolRegistry",
  });

if (!ToolRegistry.associations?.agentConfig)
  ToolRegistry.belongsTo(AgentConfig, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!AgentConfig.associations?.userRequest)
  AgentConfig.hasOne(UserRequest, {
    foreignKey: "agentConfigId",
    as: "userRequest",
  });

if (!UserRequest.associations?.agentConfig)
  UserRequest.belongsTo(AgentConfig, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!AgentConfig.associations?.environment)
  AgentConfig.hasOne(Environment, {
    foreignKey: "agentConfigId",
    as: "environment",
  });

if (!Environment.associations?.agentConfig)
  Environment.belongsTo(AgentConfig, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!Language.associations?.buildPromptToLlm)
  Language.hasOne(BuildPromptToLlm, {
    foreignKey: "languageId",
    as: "buildPromptToLlm",
  });

if (!BuildPromptToLlm.associations?.language)
  BuildPromptToLlm.belongsTo(Language, {
    foreignKey: "languageId",
    as: "language",
  });

if (!Language.associations?.receivePromptFromLlm)
  Language.hasOne(ReceivePromptFromLlm, {
    foreignKey: "languageId",
    as: "receivePromptFromLlm",
  });

if (!ReceivePromptFromLlm.associations?.language)
  ReceivePromptFromLlm.belongsTo(Language, {
    foreignKey: "languageId",
    as: "language",
  });

if (!Language.associations?.buildResponseToUser)
  Language.hasOne(AgentConfigPromptBuildResponseToUser, {
    foreignKey: "languageId",
    as: "buildResponseToUser",
  });

if (!AgentConfigPromptBuildResponseToUser.associations?.language)
  AgentConfigPromptBuildResponseToUser.belongsTo(Language, {
    foreignKey: "languageId",
    as: "language",
  });

if (!ToolRegistry.associations?.tools)
  ToolRegistry.hasMany(Tools, {
    foreignKey: "toolRegistryId",
    as: "tools",
  });

if (!Tools.associations?.toolRegistry)
  Tools.belongsTo(ToolRegistry, {
    foreignKey: "toolRegistryId",
    as: "toolRegistry",
  });

if (!UserRequest.associations?.messages)
  UserRequest.hasMany(AgentConfigPromptCommunicationMessages, {
    foreignKey: "userRequestId",
    as: "messages",
  });

if (!AgentConfigPromptCommunicationMessages.associations?.userRequest)
  AgentConfigPromptCommunicationMessages.belongsTo(UserRequest, {
    foreignKey: "userRequestId",
    as: "userRequest",
  });

if (!BuildPromptToLlm.associations?.goals)
  BuildPromptToLlm.hasMany(Goal, {
    foreignKey: "buildPromptToLlmId",
    as: "goals",
  });

if (!Goal.associations?.buildPromptToLlm)
  Goal.belongsTo(BuildPromptToLlm, {
    foreignKey: "buildPromptToLlmId",
    as: "buildPromptToLlm",
  });

if (!BuildPromptToLlm.associations?.actions)
  BuildPromptToLlm.hasMany(Actions, {
    foreignKey: "buildPromptToLlmId",
    as: "actions",
  });

if (!Actions.associations?.buildPromptToLlm)
  Actions.belongsTo(BuildPromptToLlm, {
    foreignKey: "buildPromptToLlmId",
    as: "buildPromptToLlm",
  });

if (!BuildPromptToLlm.associations?.memories)
  BuildPromptToLlm.hasMany(Memory, {
    foreignKey: "buildPromptToLlmId",
    as: "memories",
  });

if (!Memory.associations?.buildPromptToLlm)
  Memory.belongsTo(BuildPromptToLlm, {
    foreignKey: "buildPromptToLlmId",
    as: "buildPromptToLlm",
  });

if (!BuildPromptToLlm.associations?.userRequest)
  BuildPromptToLlm.hasOne(UserRequest, {
    foreignKey: "buildPromptToLlmId",
    as: "userRequest",
  });

if (!UserRequest.associations?.buildPromptToLlm)
  UserRequest.belongsTo(BuildPromptToLlm, {
    foreignKey: "buildPromptToLlmId",
    as: "buildPromptToLlm",
  });

if (!ReceivePromptFromLlm.associations?.messages)
  ReceivePromptFromLlm.hasMany(AgentConfigPromptCommunicationMessages, {
    foreignKey: "receivePromptFromLlmId",
    as: "messages",
  });

if (!AgentConfigPromptCommunicationMessages.associations?.receivePromptFromLlm)
  AgentConfigPromptCommunicationMessages.belongsTo(ReceivePromptFromLlm, {
    foreignKey: "receivePromptFromLlmId",
    as: "receivePromptFromLlm",
  });

if (!ReceivePromptFromLlm.associations?.actions)
  ReceivePromptFromLlm.hasMany(Actions, {
    foreignKey: "receivePromptFromLlmId",
    as: "actions",
  });

if (!Actions.associations?.receivePromptFromLlm)
  Actions.belongsTo(ReceivePromptFromLlm, {
    foreignKey: "receivePromptFromLlmId",
    as: "receivePromptFromLlm",
  });

if (!ReceivePromptFromLlm.associations?.toolCallRequests)
  ReceivePromptFromLlm.hasMany(AgentConfigPromptToolCallsRequest, {
    foreignKey: "receivePromptFromLlmId",
    as: "toolCallRequests",
  });

if (!AgentConfigPromptToolCallsRequest.associations?.receivePromptFromLlm)
  AgentConfigPromptToolCallsRequest.belongsTo(ReceivePromptFromLlm, {
    foreignKey: "receivePromptFromLlmId",
    as: "receivePromptFromLlm",
  });

if (!AgentConfigPromptBuildResponseToUser.associations?.messages)
  AgentConfigPromptBuildResponseToUser.hasMany(AgentConfigPromptCommunicationMessages, {
    foreignKey: "agentConfigPromptBuildResponseToUserId",
    as: "messages",
  });

if (!AgentConfigPromptCommunicationMessages.associations?.agentConfigPromptBuildResponseToUser)
  AgentConfigPromptCommunicationMessages.belongsTo(AgentConfigPromptBuildResponseToUser, {
    foreignKey: "agentConfigPromptBuildResponseToUserId",
    as: "agentConfigPromptBuildResponseToUser",
  });

if (!Tools.associations?.toolParameters)
  Tools.hasMany(ToolParameters, {
    foreignKey: "toolsId",
    as: "toolParameters",
  });

if (!ToolParameters.associations?.tools)
  ToolParameters.belongsTo(Tools, {
    foreignKey: "toolsId",
    as: "tools",
  });

if (!Tools.associations?.tags)
  Tools.hasMany(ToolTags, {
    foreignKey: "toolsId",
    as: "tags",
  });

if (!ToolTags.associations?.tools)
  ToolTags.belongsTo(Tools, {
    foreignKey: "toolsId",
    as: "tools",
  });

// --- LLM ---

if (!LlmConfig.associations?.generateResponse)
  LlmConfig.hasOne(PromptOutput, {
    foreignKey: "llmConfigId",
    as: "generateResponse",
  });

if (!PromptOutput.associations?.llmConfig)
  PromptOutput.belongsTo(LlmConfig, {
    foreignKey: "llmConfigId",
    as: "llmConfig",
  });

if (!PromptOutput.associations?.promptInput)
  PromptOutput.hasOne(PromptInput, {
    foreignKey: "promptOutputId",
    as: "promptInput",
  });

if (!PromptInput.associations?.promptOutput)
  PromptInput.belongsTo(PromptOutput, {
    foreignKey: "promptOutputId",
    as: "promptOutput",
  });

if (!PromptInput.associations?.messages)
  PromptInput.hasMany(LlmConfigPromptMessages, {
    foreignKey: "promptInputId",
    as: "messages",
  });

if (!LlmConfigPromptMessages.associations?.promptInput)
  LlmConfigPromptMessages.belongsTo(PromptInput, {
    foreignKey: "promptInputId",
    as: "promptInput",
  });

if (!PromptInput.associations?.tools)
  PromptInput.hasMany(Tools, {
    foreignKey: "promptInputId",
    as: "tools",
  });

if (!Tools.associations?.promptInput)
  Tools.belongsTo(PromptInput, {
    foreignKey: "promptInputId",
    as: "promptInput",
  });

if (!PromptInput.associations?.metadata)
  PromptInput.hasOne(MetaData, {
    foreignKey: "promptInputId",
    as: "metadata",
  });

if (!MetaData.associations?.promptInput)
  MetaData.belongsTo(PromptInput, {
    foreignKey: "promptInputId",
    as: "promptInput",
  });

if (!PromptOutput.associations?.messages)
  PromptOutput.hasMany(LlmConfigPromptMessages, {
    foreignKey: "promptOutputId",
    as: "messages",
  });

if (!LlmConfigPromptMessages.associations?.promptOutput)
  LlmConfigPromptMessages.belongsTo(PromptOutput, {
    foreignKey: "promptOutputId",
    as: "promptOutput",
  });

if (!PromptOutput.associations?.toolCallRequests)
  PromptOutput.hasMany(LlmConfigPromptToolCallsRequest, {
    foreignKey: "promptOutputId",
    as: "toolCallRequests",
  });

if (!LlmConfigPromptToolCallsRequest.associations?.promptOutput)
  LlmConfigPromptToolCallsRequest.belongsTo(PromptOutput, {
    foreignKey: "promptOutputId",
    as: "promptOutput",
  });

// --- AGENT STEP ---

if (!AgentStep.associations?.input)
  AgentStep.hasOne(Input, {
    foreignKey: "agentStepId",
    as: "input",
  });

if (!Input.associations?.agentStep)
  Input.belongsTo(AgentStep, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStep.associations?.builtPromptToLlm)
  AgentStep.hasOne(BuiltPromptToLlm, {
    foreignKey: "agentStepId",
    as: "builtPromptToLlm",
  });

if (!BuiltPromptToLlm.associations?.agentStep)
  BuiltPromptToLlm.belongsTo(AgentStep, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStep.associations?.llmResponse)
  AgentStep.hasOne(LlmResponse, {
    foreignKey: "agentStepId",
    as: "llmResponse",
  });

if (!LlmResponse.associations?.agentStep)
  LlmResponse.belongsTo(AgentStep, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStep.associations?.buildResponseToUser)
  AgentStep.hasOne(AgentStepBuildResponseToUser, {
    foreignKey: "agentStepId",
    as: "buildResponseToUser",
  });

if (!AgentStepBuildResponseToUser.associations?.agentStep)
  AgentStepBuildResponseToUser.belongsTo(AgentStep, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStep.associations?.stateUpdate)
  AgentStep.hasOne(StateUpdate, {
    foreignKey: "agentStepId",
    as: "stateUpdate",
  });

if (!StateUpdate.associations?.agentStep)
  StateUpdate.belongsTo(AgentStep, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStep.associations?.toolExecutions)
  AgentStep.hasMany(AgentStepToolExecutions, {
    foreignKey: "agentStepId",
    as: "toolExecutions",
  });

if (!AgentStepToolExecutions.associations?.agentStep)
  AgentStepToolExecutions.belongsTo(AgentStep, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!Input.associations?.userRequest)
  Input.hasOne(UserRequest, {
    foreignKey: "inputId",
    as: "userRequest",
  });

if (!UserRequest.associations?.input)
  UserRequest.belongsTo(Input, {
    foreignKey: "inputId",
    as: "input",
  });

if (!Input.associations?.memories)
  Input.hasMany(Memory, {
    foreignKey: "inputId",
    as: "memories",
  });

if (!Memory.associations?.input)
  Memory.belongsTo(Input, {
    foreignKey: "inputId",
    as: "input",
  });

if (!Input.associations?.goals)
  Input.hasMany(Goal, {
    foreignKey: "inputId",
    as: "goals",
  });

if (!Goal.associations?.input)
  Goal.belongsTo(Input, {
    foreignKey: "inputId",
    as: "input",
  });

if (!BuiltPromptToLlm.associations?.messages)
  BuiltPromptToLlm.hasMany(AgentConfigPromptCommunicationMessages, {
    foreignKey: "builtPromptToLlmId",
    as: "messages",
  });

if (!AgentConfigPromptCommunicationMessages.associations?.builtPromptToLlm)
  AgentConfigPromptCommunicationMessages.belongsTo(BuiltPromptToLlm, {
    foreignKey: "builtPromptToLlmId",
    as: "builtPromptToLlm",
  });

if (!BuiltPromptToLlm.associations?.tools)
  BuiltPromptToLlm.hasMany(Tools, {
    foreignKey: "builtPromptToLlmId",
    as: "tools",
  });

if (!Tools.associations?.builtPromptToLlm)
  Tools.belongsTo(BuiltPromptToLlm, {
    foreignKey: "builtPromptToLlmId",
    as: "builtPromptToLlm",
  });

if (!BuiltPromptToLlm.associations?.metadata)
  BuiltPromptToLlm.hasOne(MetaData, {
    foreignKey: "builtPromptToLlmId",
    as: "metadata",
  });

if (!MetaData.associations?.builtPromptToLlm)
  MetaData.belongsTo(BuiltPromptToLlm, {
    foreignKey: "builtPromptToLlmId",
    as: "builtPromptToLlm",
  });

if (!LlmResponse.associations?.messages)
  LlmResponse.hasMany(AgentConfigPromptCommunicationMessages, {
    foreignKey: "llmResponseId",
    as: "messages",
  });

if (!AgentConfigPromptCommunicationMessages.associations?.llmResponse)
  AgentConfigPromptCommunicationMessages.belongsTo(LlmResponse, {
    foreignKey: "llmResponseId",
    as: "llmResponse",
  });

if (!LlmResponse.associations?.toolCallRequests)
  LlmResponse.hasMany(AgentConfigPromptToolCallsRequest, {
    foreignKey: "llmResponseId",
    as: "toolCallRequests",
  });

if (!AgentConfigPromptToolCallsRequest.associations?.llmResponse)
  AgentConfigPromptToolCallsRequest.belongsTo(LlmResponse, {
    foreignKey: "llmResponseId",
    as: "llmResponse",
  });

if (!AgentStepToolExecutions.associations?.toolCallRequest)
  AgentStepToolExecutions.hasOne(AgentConfigPromptToolCallsRequest, {
    foreignKey: "toolExecutionsId",
    as: "toolCallRequest",
  });

if (!AgentConfigPromptToolCallsRequest.associations?.toolExecutions)
  AgentConfigPromptToolCallsRequest.belongsTo(AgentStepToolExecutions, {
    foreignKey: "toolExecutionsId",
    as: "toolExecutions",
  });

if (!AgentStepToolExecutions.associations?.toolResult)
  AgentStepToolExecutions.hasOne(ToolResult, {
    foreignKey: "toolExecutionsId",
    as: "toolResult",
  });

if (!ToolResult.associations?.toolExecutions)
  ToolResult.belongsTo(AgentStepToolExecutions, {
    foreignKey: "toolExecutionsId",
    as: "toolExecutions",
  });

if (!AgentStepBuildResponseToUser.associations?.messages)
  AgentStepBuildResponseToUser.hasMany(AgentConfigPromptCommunicationMessages, {
    foreignKey: "agentStepBuildResponseToUserId",
    as: "messages",
  });

if (!AgentConfigPromptCommunicationMessages.associations?.agentStepBuildResponseToUser)
  AgentConfigPromptCommunicationMessages.belongsTo(AgentStepBuildResponseToUser, {
    foreignKey: "agentStepBuildResponseToUserId",
    as: "agentStepBuildResponseToUser",
  });

if (!StateUpdate.associations?.actions)
  StateUpdate.hasMany(Actions, {
    foreignKey: "stateUpdateId",
    as: "actions",
  });

if (!Actions.associations?.stateUpdate)
  Actions.belongsTo(StateUpdate, {
    foreignKey: "stateUpdateId",
    as: "stateUpdate",
  });

export {
  sequelize,
  AgentConfig,
  LlmConfig,
  AgentStep,
  Language,
  ToolRegistry,
  UserRequest,
  Environment,
  Tools,
  Goal,
  Memory,
  Actions,
  AgentConfigPromptCommunicationMessages,
  BuildPromptToLlm,
  ReceivePromptFromLlm,
  AgentConfigPromptBuildResponseToUser,
  ToolParameters,
  Properties,
  ToolTags,
  ToolResult,
  AgentConfigPromptToolCallsRequest,
  AgentConfigToolExecutions,
  PromptOutput,
  PromptInput,
  MetaData,
  LlmConfigPromptMessages,
  LlmConfigPromptToolCallsRequest,
  Input,
  BuiltPromptToLlm,
  LlmResponse,
  AgentStepBuildResponseToUser,
  StateUpdate,
  Action,
  AgentStepToolExecutions,
};

export default {
  AgentConfig,
  LlmConfig,
  AgentStep,
  Language,
  ToolRegistry,
  UserRequest,
  Environment,
  Tools,
  Goal,
  Memory,
  Actions,
  AgentConfigPromptCommunicationMessages,
  BuildPromptToLlm,
  ReceivePromptFromLlm,
  AgentConfigPromptBuildResponseToUser,
  ToolParameters,
  Properties,
  ToolTags,
  ToolResult,
  AgentConfigPromptToolCallsRequest,
  AgentConfigToolExecutions,
  PromptOutput,
  PromptInput,
  MetaData,
  LlmConfigPromptMessages,
  LlmConfigPromptToolCallsRequest,
  Input,
  BuiltPromptToLlm,
  LlmResponse,
  AgentStepBuildResponseToUser,
  StateUpdate,
  Action,
  AgentStepToolExecutions,
};

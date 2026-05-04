import sequelize from "../../lib/db.js";
import AgentConfigModel from "./agentConfig.js";
import EnvironmentModel from "./agentConfig/environment.js";
import LanguageModel from "./agentConfig/language.js";
import BuildPromptToLlmModel from "./agentConfig/prompt/buildPromptToLlm.js";
import AgentConfigBuildResponseToUserModel from "./agentConfig/prompt/buildResponseToUser.js";
import ActionsModel from "./agentConfig/prompt/communication/actions.js";
import GoalModel from "./agentConfig/prompt/communication/goal.js";
import MemoryModel from "./agentConfig/prompt/communication/memory.js";
import AgentConfigMessagesModel from "./agentConfig/prompt/communication/messages.js";
import ReceivePromptFromLlmModel from "./agentConfig/prompt/receivePromptFromLlm.js";
import AgentConfigToolCallsRequestModel from "./agentConfig/prompt/toolCallsRequest.js";
import ToolParametersModel from "./agentConfig/prompt/toolParameters.js";
import PropertiesModel from "./agentConfig/prompt/toolParameters/properties.js";
import ToolResultModel from "./agentConfig/prompt/toolResult.js";
import ToolTagsModel from "./agentConfig/prompt/toolTags.js";
import AgentConfigToolExecutionsModel from "./agentConfig/toolExecutions.js";
import ToolRegistryModel from "./agentConfig/toolRegistry.js";
import ToolsModel from "./agentConfig/tools.js";
import UserRequestModel from "./agentConfig/userRequest.js";
import AgentStepModel from "./agentStep.js";
import AgentStepConfigBuildResponseToUserModel from "./agentStepConfig/buildResponseToUser.js";
import BuiltPromptToLlmModel from "./agentStepConfig/builtPromptToLlm.js";
import ActionModel from "./agentStepConfig/communication/action.js";
import InputModel from "./agentStepConfig/input.js";
import LlmResponseModel from "./agentStepConfig/llmResponse.js";
import StateUpdateModel from "./agentStepConfig/stateUpdate.js";
import AgentStepConfigToolExecutionsModel from "./agentStepConfig/toolExecutions.js";
import LlmConfigModel from "./llmConfig.js";
import LlmConfigMessagesModel from "./llmConfig/prompt/messages.js";
import MetaDataModel from "./llmConfig/prompt/metaData.js";
import LlmConfigToolCallsRequestModel from "./llmConfig/prompt/toolCallsRequest.js";
import PromptInputModel from "./llmConfig/promptInput.js";
import PromptOutputModel from "./llmConfig/promptOutput.js";

if (!AgentConfigModel.associations?.goals)
  AgentConfigModel.hasMany(GoalModel, {
    foreignKey: "agentConfigId",
    as: "goals",
  });

if (!GoalModel.associations?.agentConfig)
  GoalModel.belongsTo(AgentConfigModel, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!AgentConfigModel.associations?.language)
  AgentConfigModel.hasOne(LanguageModel, {
    foreignKey: "agentConfigId",
    as: "language",
  });

if (!LanguageModel.associations?.agentConfig)
  LanguageModel.belongsTo(AgentConfigModel, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!AgentConfigModel.associations?.toolRegistry)
  AgentConfigModel.hasOne(ToolRegistryModel, {
    foreignKey: "agentConfigId",
    as: "toolRegistry",
  });

if (!ToolRegistryModel.associations?.agentConfig)
  ToolRegistryModel.belongsTo(AgentConfigModel, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!AgentConfigModel.associations?.userRequest)
  AgentConfigModel.hasOne(UserRequestModel, {
    foreignKey: "agentConfigId",
    as: "userRequest",
  });

if (!UserRequestModel.associations?.agentConfig)
  UserRequestModel.belongsTo(AgentConfigModel, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!AgentConfigModel.associations?.environment)
  AgentConfigModel.hasOne(EnvironmentModel, {
    foreignKey: "agentConfigId",
    as: "environment",
  });

if (!EnvironmentModel.associations?.agentConfig)
  EnvironmentModel.belongsTo(AgentConfigModel, {
    foreignKey: "agentConfigId",
    as: "agentConfig",
  });

if (!LanguageModel.associations?.buildPromptToLlm)
  LanguageModel.hasOne(BuildPromptToLlmModel, {
    foreignKey: "languageId",
    as: "buildPromptToLlm",
  });

if (!BuildPromptToLlmModel.associations?.language)
  BuildPromptToLlmModel.belongsTo(LanguageModel, {
    foreignKey: "languageId",
    as: "language",
  });

if (!LanguageModel.associations?.receivePromptFromLlm)
  LanguageModel.hasOne(ReceivePromptFromLlmModel, {
    foreignKey: "languageId",
    as: "receivePromptFromLlm",
  });

if (!ReceivePromptFromLlmModel.associations?.language)
  ReceivePromptFromLlmModel.belongsTo(LanguageModel, {
    foreignKey: "languageId",
    as: "language",
  });

if (!LanguageModel.associations?.buildResponseToUser)
  LanguageModel.hasOne(AgentConfigBuildResponseToUserModel, {
    foreignKey: "languageId",
    as: "buildResponseToUser",
  });

if (!AgentConfigBuildResponseToUserModel.associations?.language)
  AgentConfigBuildResponseToUserModel.belongsTo(LanguageModel, {
    foreignKey: "languageId",
    as: "language",
  });

if (!ToolRegistryModel.associations?.tools)
  ToolRegistryModel.hasMany(ToolsModel, {
    foreignKey: "toolRegistryId",
    as: "tools",
  });

if (!ToolsModel.associations?.toolRegistry)
  ToolsModel.belongsTo(ToolRegistryModel, {
    foreignKey: "toolRegistryId",
    as: "toolRegistry",
  });

if (!UserRequestModel.associations?.messages)
  UserRequestModel.hasMany(AgentConfigMessagesModel, {
    foreignKey: "userRequestId",
    as: "messages",
  });

if (!AgentConfigMessagesModel.associations?.userRequest)
  AgentConfigMessagesModel.belongsTo(UserRequestModel, {
    foreignKey: "userRequestId",
    as: "userRequest",
  });

if (!BuildPromptToLlmModel.associations?.goals)
  BuildPromptToLlmModel.hasMany(GoalModel, {
    foreignKey: "buildPromptToLlmId",
    as: "goals",
  });

if (!GoalModel.associations?.buildPromptToLlm)
  GoalModel.belongsTo(BuildPromptToLlmModel, {
    foreignKey: "buildPromptToLlmId",
    as: "buildPromptToLlm",
  });

if (!BuildPromptToLlmModel.associations?.actions)
  BuildPromptToLlmModel.hasMany(ActionsModel, {
    foreignKey: "buildPromptToLlmId",
    as: "actions",
  });

if (!ActionsModel.associations?.buildPromptToLlm)
  ActionsModel.belongsTo(BuildPromptToLlmModel, {
    foreignKey: "buildPromptToLlmId",
    as: "buildPromptToLlm",
  });

if (!BuildPromptToLlmModel.associations?.memories)
  BuildPromptToLlmModel.hasMany(MemoryModel, {
    foreignKey: "buildPromptToLlmId",
    as: "memories",
  });

if (!MemoryModel.associations?.buildPromptToLlm)
  MemoryModel.belongsTo(BuildPromptToLlmModel, {
    foreignKey: "buildPromptToLlmId",
    as: "buildPromptToLlm",
  });

if (!BuildPromptToLlmModel.associations?.userRequest)
  BuildPromptToLlmModel.hasOne(UserRequestModel, {
    foreignKey: "buildPromptToLlmId",
    as: "userRequest",
  });

if (!UserRequestModel.associations?.buildPromptToLlm)
  UserRequestModel.belongsTo(BuildPromptToLlmModel, {
    foreignKey: "buildPromptToLlmId",
    as: "buildPromptToLlm",
  });

if (!ReceivePromptFromLlmModel.associations?.messages)
  ReceivePromptFromLlmModel.hasMany(AgentConfigMessagesModel, {
    foreignKey: "receivePromptFromLlmId",
    as: "messages",
  });

if (!AgentConfigMessagesModel.associations?.receivePromptFromLlm)
  AgentConfigMessagesModel.belongsTo(ReceivePromptFromLlmModel, {
    foreignKey: "receivePromptFromLlmId",
    as: "receivePromptFromLlm",
  });

if (!ReceivePromptFromLlmModel.associations?.actions)
  ReceivePromptFromLlmModel.hasMany(ActionsModel, {
    foreignKey: "receivePromptFromLlmId",
    as: "actions",
  });

if (!ActionsModel.associations?.receivePromptFromLlm)
  ActionsModel.belongsTo(ReceivePromptFromLlmModel, {
    foreignKey: "receivePromptFromLlmId",
    as: "receivePromptFromLlm",
  });

if (!ReceivePromptFromLlmModel.associations?.toolCallRequests)
  ReceivePromptFromLlmModel.hasMany(AgentConfigToolCallsRequestModel, {
    foreignKey: "receivePromptFromLlmId",
    as: "toolCallRequests",
  });

if (!AgentConfigToolCallsRequestModel.associations?.receivePromptFromLlm)
  AgentConfigToolCallsRequestModel.belongsTo(ReceivePromptFromLlmModel, {
    foreignKey: "receivePromptFromLlmId",
    as: "receivePromptFromLlm",
  });

if (!AgentConfigBuildResponseToUserModel.associations?.messages)
  AgentConfigBuildResponseToUserModel.hasMany(AgentConfigMessagesModel, {
    foreignKey: "agentConfigBuildResponseToUserId",
    as: "messages",
  });

if (!AgentConfigMessagesModel.associations?.buildResponseToUser)
  AgentConfigMessagesModel.belongsTo(AgentConfigBuildResponseToUserModel, {
    foreignKey: "agentConfigBuildResponseToUserId",
    as: "buildResponseToUser",
  });

if (!ToolsModel.associations?.toolParameters)
  ToolsModel.hasMany(ToolParametersModel, {
    foreignKey: "toolsId",
    as: "toolParameters",
  });

if (!ToolParametersModel.associations?.tools)
  ToolParametersModel.belongsTo(ToolsModel, {
    foreignKey: "toolsId",
    as: "tools",
  });

if (!ToolsModel.associations?.tags)
  ToolsModel.hasMany(ToolTagsModel, {
    foreignKey: "toolsId",
    as: "tags",
  });

if (!ToolTagsModel.associations?.tools)
  ToolTagsModel.belongsTo(ToolsModel, {
    foreignKey: "toolsId",
    as: "tools",
  });

  if (!LlmConfigModel.associations?.promptInput)
    LlmConfigModel.hasMany(PromptInputModel, {
      foreignKey: "llmConfigId",
      as: "promptInput",
    });
  
  if (!PromptInputModel.associations?.llmConfig)
    PromptInputModel.belongsTo(LlmConfigModel, {
      foreignKey: "llmConfigId",
      as: "llmConfig",
    });
  
  if (!LlmConfigModel.associations?.promptOutput)
    LlmConfigModel.hasMany(PromptOutputModel, {
      foreignKey: "llmConfigId",
      as: "promptOutput",
    });
  
  if (!PromptOutputModel.associations?.llmConfig)
    PromptOutputModel.belongsTo(LlmConfigModel, {
      foreignKey: "llmConfigId",
      as: "llmConfig",
    });

if (!PromptInputModel.associations?.messages)
  PromptInputModel.hasMany(LlmConfigMessagesModel, {
    foreignKey: "promptInputId",
    as: "messages",
  });

if (!LlmConfigMessagesModel.associations?.promptInput)
  LlmConfigMessagesModel.belongsTo(PromptInputModel, {
    foreignKey: "promptInputId",
    as: "promptInput",
  });

if (!PromptInputModel.associations?.tools)
  PromptInputModel.hasMany(ToolsModel, {
    foreignKey: "promptInputId",
    as: "tools",
  });

if (!ToolsModel.associations?.promptInput)
  ToolsModel.belongsTo(PromptInputModel, {
    foreignKey: "promptInputId",
    as: "promptInput",
  });

if (!PromptInputModel.associations?.metadata)
  PromptInputModel.hasOne(MetaDataModel, {
    foreignKey: "promptInputId",
    as: "metadata",
  });

if (!MetaDataModel.associations?.promptInput)
  MetaDataModel.belongsTo(PromptInputModel, {
    foreignKey: "promptInputId",
    as: "promptInput",
  });

if (!PromptOutputModel.associations?.messages)
  PromptOutputModel.hasMany(LlmConfigMessagesModel, {
    foreignKey: "promptOutputId",
    as: "messages",
  });

if (!LlmConfigMessagesModel.associations?.promptOutput)
  LlmConfigMessagesModel.belongsTo(PromptOutputModel, {
    foreignKey: "promptOutputId",
    as: "promptOutput",
  });

if (!PromptOutputModel.associations?.toolCallRequests)
  PromptOutputModel.hasMany(LlmConfigToolCallsRequestModel, {
    foreignKey: "promptOutputId",
    as: "toolCallRequests",
  });

if (!LlmConfigToolCallsRequestModel.associations?.promptOutput)
  LlmConfigToolCallsRequestModel.belongsTo(PromptOutputModel, {
    foreignKey: "promptOutputId",
    as: "promptOutput",
  });

if (!AgentStepModel.associations?.input)
  AgentStepModel.hasOne(InputModel, {
    foreignKey: "agentStepId",
    as: "input",
  });

if (!InputModel.associations?.agentStep)
  InputModel.belongsTo(AgentStepModel, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStepModel.associations?.builtPromptToLlm)
  AgentStepModel.hasOne(BuiltPromptToLlmModel, {
    foreignKey: "agentStepId",
    as: "builtPromptToLlm",
  });

if (!BuiltPromptToLlmModel.associations?.agentStep)
  BuiltPromptToLlmModel.belongsTo(AgentStepModel, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStepModel.associations?.llmResponse)
  AgentStepModel.hasOne(LlmResponseModel, {
    foreignKey: "agentStepId",
    as: "llmResponse",
  });

if (!LlmResponseModel.associations?.agentStep)
  LlmResponseModel.belongsTo(AgentStepModel, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStepModel.associations?.buildResponseToUser)
  AgentStepModel.hasOne(AgentStepConfigBuildResponseToUserModel, {
    foreignKey: "agentStepId",
    as: "buildResponseToUser",
  });

if (!AgentStepConfigBuildResponseToUserModel.associations?.agentStep)
  AgentStepConfigBuildResponseToUserModel.belongsTo(AgentStepModel, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStepModel.associations?.stateUpdate)
  AgentStepModel.hasOne(StateUpdateModel, {
    foreignKey: "agentStepId",
    as: "stateUpdate",
  });

if (!StateUpdateModel.associations?.agentStep)
  StateUpdateModel.belongsTo(AgentStepModel, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!AgentStepModel.associations?.toolExecutions)
  AgentStepModel.hasMany(AgentStepConfigToolExecutionsModel, {
    foreignKey: "agentStepId",
    as: "toolExecutions",
  });

if (!AgentStepConfigToolExecutionsModel.associations?.agentStep)
  AgentStepConfigToolExecutionsModel.belongsTo(AgentStepModel, {
    foreignKey: "agentStepId",
    as: "agentStep",
  });

if (!InputModel.associations?.userRequest)
  InputModel.hasOne(UserRequestModel, {
    foreignKey: "inputId",
    as: "userRequest",
  });

if (!UserRequestModel.associations?.input)
  UserRequestModel.belongsTo(InputModel, {
    foreignKey: "inputId",
    as: "input",
  });

if (!InputModel.associations?.memories)
  InputModel.hasMany(MemoryModel, {
    foreignKey: "inputId",
    as: "memories",
  });

if (!MemoryModel.associations?.input)
  MemoryModel.belongsTo(InputModel, {
    foreignKey: "inputId",
    as: "input",
  });

if (!InputModel.associations?.goals)
  InputModel.hasMany(GoalModel, {
    foreignKey: "inputId",
    as: "goals",
  });

if (!GoalModel.associations?.input)
  GoalModel.belongsTo(InputModel, {
    foreignKey: "inputId",
    as: "input",
  });

if (!BuiltPromptToLlmModel.associations?.messages)
  BuiltPromptToLlmModel.hasMany(LlmConfigMessagesModel, {
    foreignKey: "builtPromptToLlmId",
    as: "messages",
  });

if (!LlmConfigMessagesModel.associations?.builtPromptToLlm)
  LlmConfigMessagesModel.belongsTo(BuiltPromptToLlmModel, {
    foreignKey: "builtPromptToLlmId",
    as: "builtPromptToLlm",
  });

if (!BuiltPromptToLlmModel.associations?.tools)
  BuiltPromptToLlmModel.hasMany(ToolsModel, {
    foreignKey: "builtPromptToLlmId",
    as: "tools",
  });

if (!ToolsModel.associations?.builtPromptToLlm)
  ToolsModel.belongsTo(BuiltPromptToLlmModel, {
    foreignKey: "builtPromptToLlmId",
    as: "builtPromptToLlm",
  });

if (!BuiltPromptToLlmModel.associations?.metadata)
  BuiltPromptToLlmModel.hasOne(MetaDataModel, {
    foreignKey: "builtPromptToLlmId",
    as: "metadata",
  });

if (!MetaDataModel.associations?.builtPromptToLlm)
  MetaDataModel.belongsTo(BuiltPromptToLlmModel, {
    foreignKey: "builtPromptToLlmId",
    as: "builtPromptToLlm",
  });

if (!LlmResponseModel.associations?.messages)
  LlmResponseModel.hasMany(LlmConfigMessagesModel, {
    foreignKey: "llmResponseId",
    as: "messages",
  });

if (!LlmConfigMessagesModel.associations?.llmResponse)
  LlmConfigMessagesModel.belongsTo(LlmResponseModel, {
    foreignKey: "llmResponseId",
    as: "llmResponse",
  });

if (!LlmResponseModel.associations?.toolCallRequests)
  LlmResponseModel.hasMany(LlmConfigToolCallsRequestModel, {
    foreignKey: "llmResponseId",
    as: "toolCallRequests",
  });

if (!LlmConfigToolCallsRequestModel.associations?.llmResponse)
  LlmConfigToolCallsRequestModel.belongsTo(LlmResponseModel, {
    foreignKey: "llmResponseId",
    as: "llmResponse",
  });

if (!AgentStepConfigToolExecutionsModel.associations?.toolCallRequest)
  AgentStepConfigToolExecutionsModel.hasOne(AgentConfigToolCallsRequestModel, {
    foreignKey: "toolExecutionId",
    as: "toolCallRequest",
  });

if (!AgentConfigToolCallsRequestModel.associations?.toolExecution)
  AgentConfigToolCallsRequestModel.belongsTo(AgentStepConfigToolExecutionsModel, {
    foreignKey: "toolExecutionId",
    as: "toolExecution",
  });

if (!AgentStepConfigToolExecutionsModel.associations?.toolResult)
  AgentStepConfigToolExecutionsModel.hasOne(ToolResultModel, {
    foreignKey: "toolExecutionId",
    as: "toolResult",
  });

if (!ToolResultModel.associations?.toolExecution)
  ToolResultModel.belongsTo(AgentStepConfigToolExecutionsModel, {
    foreignKey: "toolExecutionId",
    as: "toolExecution",
  });

if (!StateUpdateModel.associations?.actions)
  StateUpdateModel.hasMany(ActionModel, {
    foreignKey: "stateUpdateId",
    as: "actions",
  });

if (!ActionModel.associations?.stateUpdate)
  ActionModel.belongsTo(StateUpdateModel, {
    foreignKey: "stateUpdateId",
    as: "stateUpdate",
  });

export {
  sequelize,
  AgentConfigModel,
  EnvironmentModel,
  LanguageModel,
  BuildPromptToLlmModel,
  AgentConfigBuildResponseToUserModel,
  ActionsModel,
  GoalModel,
  MemoryModel,
  AgentConfigMessagesModel,
  ReceivePromptFromLlmModel,
  AgentConfigToolCallsRequestModel,
  ToolParametersModel,
  PropertiesModel,
  ToolResultModel,
  ToolTagsModel,
  AgentConfigToolExecutionsModel,
  ToolRegistryModel,
  ToolsModel,
  UserRequestModel,
  AgentStepModel,
  AgentStepConfigBuildResponseToUserModel,
  BuiltPromptToLlmModel,
  ActionModel,
  InputModel,
  LlmResponseModel,
  StateUpdateModel,
  AgentStepConfigToolExecutionsModel,
  LlmConfigModel,
  LlmConfigMessagesModel,
  MetaDataModel,
  LlmConfigToolCallsRequestModel,
  PromptInputModel,
  PromptOutputModel,
};

export default {
  sequelize,
  AgentConfigModel,
  EnvironmentModel,
  LanguageModel,
  BuildPromptToLlmModel,
  AgentConfigBuildResponseToUserModel,
  ActionsModel,
  GoalModel,
  MemoryModel,
  AgentConfigMessagesModel,
  ReceivePromptFromLlmModel,
  AgentConfigToolCallsRequestModel,
  ToolParametersModel,
  PropertiesModel,
  ToolResultModel,
  ToolTagsModel,
  AgentConfigToolExecutionsModel,
  ToolRegistryModel,
  ToolsModel,
  UserRequestModel,
  AgentStepModel,
  AgentStepConfigBuildResponseToUserModel,
  BuiltPromptToLlmModel,
  ActionModel,
  InputModel,
  LlmResponseModel,
  StateUpdateModel,
  AgentStepConfigToolExecutionsModel,
  LlmConfigModel,
  LlmConfigMessagesModel,
  MetaDataModel,
  LlmConfigToolCallsRequestModel,
  PromptInputModel,
  PromptOutputModel,
};

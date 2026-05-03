import sequelize from "../../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Messages extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentConfigPromptCommunicationMessages) {
return sequelize.models.AgentConfigPromptCommunicationMessages;
}
};
Messages.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
role: {
type: DataTypes.STRING,
allowNull: true,
},

content: {
type: DataTypes.TEXT,
allowNull: true,
},

userRequestId: {
type: DataTypes.UUID,
allowNull: true,
},
receivePromptFromLlmId: {
type: DataTypes.UUID,
allowNull: true,
},
agentConfigPromptBuildResponseToUserId: {
type: DataTypes.UUID,
allowNull: true,
},
builtPromptToLlmId: {
type: DataTypes.UUID,
allowNull: true,
},
agentStepBuildResponseToUserId: {
type: DataTypes.UUID,
allowNull: true,
},
llmResponseId: {
type: DataTypes.UUID,
allowNull: true,
},
agentConfigId: {
type: DataTypes.UUID,
allowNull: true,
},
createdAt: {
type: DataTypes.DATE,
allowNull: false,
defaultValue: DataTypes.NOW,
},
updatedAt: {
type: DataTypes.DATE,
allowNull: false,
defaultValue: DataTypes.NOW,
},
},
{
sequelize,
modelName: "AgentConfigPromptCommunicationMessages",
tableName: "agent_config_prompt_communication_messages",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Messages;

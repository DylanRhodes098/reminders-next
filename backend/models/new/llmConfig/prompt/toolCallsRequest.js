import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ToolCallsRequest extends Model {}
export const hotReloads = () => {
if (sequelize.models.LlmConfigPromptToolCallsRequest) {
return sequelize.models.LlmConfigPromptToolCallsRequest;
}
};
ToolCallsRequest.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
toolId: {
type: DataTypes.UUID,
allowNull: true,
},
toolName: {
type: DataTypes.STRING,
allowNull: true,
},

args: {
type: DataTypes.JSONB,
allowNull: true,
},

promptInputId: {
type: DataTypes.UUID,
allowNull: true,
},
promptOutputId: {
type: DataTypes.UUID,
allowNull: true,
},
toolExecutionsId: {
type: DataTypes.UUID,
allowNull: true,
},
llmConfigId: {
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
modelName: "LlmConfigPromptToolCallsRequest",
tableName: "llm_config_prompt_tool_calls_request",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ToolCallsRequest;

import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ToolCallsRequest extends Model {}
export const hotReloads = () => {
if (sequelize.models.LlmConfigToolCallsRequest) {
return sequelize.models.LlmConfigToolCallsRequest;
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
promptId: {
type: DataTypes.UUID,
allowNull: true,
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
type: DataTypes.JSON,
allowNull: true,
},
promptOutputId: {
type: DataTypes.UUID,
allowNull: true,
},
llmResponseId: {
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
modelName: "LlmConfigToolCallsRequest",
tableName: "llm_config_tool_calls_request",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ToolCallsRequest;

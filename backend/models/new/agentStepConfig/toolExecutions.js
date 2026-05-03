import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ToolExecutions extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentStepConfigToolExecutions) {
return sequelize.models.AgentStepConfigToolExecutions;
}
};
ToolExecutions.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
agentStepId: {
type: DataTypes.UUID,
allowNull: true,
},
success: {
type: DataTypes.BOOLEAN,
allowNull: true,
},
error: {
type: DataTypes.TEXT,
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
modelName: "AgentStepConfigToolExecutions",
tableName: "agent_step_config_tool_executions",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ToolExecutions;

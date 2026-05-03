import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ToolExecutions extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentStepToolExecutions) {
return sequelize.models.AgentStepToolExecutions;
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
modelName: "AgentStepToolExecutions",
tableName: "agent_step_tool_executions",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ToolExecutions;

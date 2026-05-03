import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ToolExecutions extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentConfigToolExecutions) {
return sequelize.models.AgentConfigToolExecutions;
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
modelName: "AgentConfigToolExecutions",
tableName: "agent_config_tool_executions",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ToolExecutions;

import sequelize from "../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class AgentStep extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentStep) {
return sequelize.models.AgentStep;
}
};
AgentStep.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
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
modelName: "AgentStep",
tableName: "agent_step",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default AgentStep;

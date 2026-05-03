import sequelize from "../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class AgentConfig extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentConfig) {
return sequelize.models.AgentConfig;
}
};
AgentConfig.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
name: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
},
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
modelName: "AgentConfig",
tableName: "agent_config",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default AgentConfig;

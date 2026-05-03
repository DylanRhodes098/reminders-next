import sequelize from "../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class LlmConfig extends Model {}
export const hotReloads = () => {
if (sequelize.models.LlmConfig) {
return sequelize.models.LlmConfig;
}
};
LlmConfig.init(
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
modelName: "LlmConfig",
tableName: "llm_config",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default LlmConfig;

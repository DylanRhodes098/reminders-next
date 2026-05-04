import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Environment extends Model {}
export const hotReloads = () => {
if (sequelize.models.Environment) {
return sequelize.models.Environment;
}
};
Environment.init(
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
name: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
},
},
workingDirectory: {
type: DataTypes.STRING,
allowNull: true,
},
context: {
type: DataTypes.JSON,
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
modelName: "Environment",
tableName: "environment",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Environment;

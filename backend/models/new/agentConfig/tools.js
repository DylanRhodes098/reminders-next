import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Tools extends Model {}
export const hotReloads = () => {
if (sequelize.models.Tools) {
return sequelize.models.Tools;
}
};
Tools.init(
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

description: {
type: DataTypes.TEXT,
allowNull: true,
},

terminal: {
type: DataTypes.BOOLEAN,
allowNull: true,
},

toolRegistryId: {
type: DataTypes.UUID,
allowNull: true,
},
builtPromptToLlmId: {
type: DataTypes.UUID,
allowNull: true,
},
promptInputId: {
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
modelName: "Tools",
tableName: "tools",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Tools;

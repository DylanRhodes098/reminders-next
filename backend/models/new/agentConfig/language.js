import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Language extends Model {}
export const hotReloads = () => {
if (sequelize.models.Language) {
return sequelize.models.Language;
}
};
Language.init(
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
modelName: "Language",
tableName: "language",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Language;

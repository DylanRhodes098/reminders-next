import sequelize from "../../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Actions extends Model {}
export const hotReloads = () => {
if (sequelize.models.Actions) {
return sequelize.models.Actions;
}
};
Actions.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
communicationId: {
type: DataTypes.UUID,
allowNull: true,
},
type: {
type: DataTypes.STRING,
allowNull: true,
},
name: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
},
},
data: {
type: DataTypes.JSONB,
allowNull: true,
},
buildPromptToLlmId: {
type: DataTypes.UUID,
allowNull: true,
},
receivePromptFromLlmId: {
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
modelName: "Actions",
tableName: "actions",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Actions;

import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class PromptInput extends Model {}
export const hotReloads = () => {
if (sequelize.models.PromptInput) {
return sequelize.models.PromptInput;
}
};
PromptInput.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
promptOutputId: {
type: DataTypes.UUID,
allowNull: true,
},
llmConfigId: {
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
modelName: "PromptInput",
tableName: "prompt_input",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default PromptInput;

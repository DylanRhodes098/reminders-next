import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class BuildPromptToLlm extends Model {}
export const hotReloads = () => {
if (sequelize.models.BuildPromptToLlm) {
return sequelize.models.BuildPromptToLlm;
}
};
BuildPromptToLlm.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
promptId: {
type: DataTypes.UUID,
allowNull: true,
},
languageId: {
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
modelName: "BuildPromptToLlm",
tableName: "build_prompt_to_llm",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default BuildPromptToLlm;

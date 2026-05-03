import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class BuiltPromptToLlm extends Model {}
export const hotReloads = () => {
if (sequelize.models.BuiltPromptToLlm) {
return sequelize.models.BuiltPromptToLlm;
}
};
BuiltPromptToLlm.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
agentStepId: {
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
modelName: "BuiltPromptToLlm",
tableName: "built_prompt_to_llm",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default BuiltPromptToLlm;

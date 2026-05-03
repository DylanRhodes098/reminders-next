import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ReceivePromptFromLlm extends Model {}
export const hotReloads = () => {
if (sequelize.models.ReceivePromptFromLlm) {
return sequelize.models.ReceivePromptFromLlm;
}
};
ReceivePromptFromLlm.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
languageId: {
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
modelName: "ReceivePromptFromLlm",
tableName: "receive_prompt_from_llm",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ReceivePromptFromLlm;

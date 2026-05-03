import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Messages extends Model {}
export const hotReloads = () => {
if (sequelize.models.LlmConfigPromptMessages) {
return sequelize.models.LlmConfigPromptMessages;
}
};
Messages.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
role: {
type: DataTypes.STRING,
allowNull: true,
},

content: {
type: DataTypes.TEXT,
allowNull: true,
},

promptInputId: {
type: DataTypes.UUID,
allowNull: true,
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
modelName: "LlmConfigPromptMessages",
tableName: "llm_config_prompt_messages",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Messages;

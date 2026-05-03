import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Messages extends Model {}
export const hotReloads = () => {
if (sequelize.models.LlmConfigMessages) {
return sequelize.models.LlmConfigMessages;
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
promptId: {
type: DataTypes.UUID,
allowNull: true,
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
builtPromptToLlmId: {
type: DataTypes.UUID,
allowNull: true,
},
llmResponseId: {
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
modelName: "LlmConfigMessages",
tableName: "llm_config_messages",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Messages;

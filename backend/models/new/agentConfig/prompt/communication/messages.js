import sequelize from "../../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Messages extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentConfigMessages) {
return sequelize.models.AgentConfigMessages;
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
communicationId: {
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
userRequestId: {
type: DataTypes.UUID,
allowNull: true,
},
receivePromptFromLlmId: {
type: DataTypes.UUID,
allowNull: true,
},
agentConfigBuildResponseToUserId: {
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
modelName: "AgentConfigMessages",
tableName: "agent_config_messages",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Messages;

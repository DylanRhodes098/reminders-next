import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class BuildResponseToUser extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentConfigPromptBuildResponseToUser) {
return sequelize.models.AgentConfigPromptBuildResponseToUser;
}
};
BuildResponseToUser.init(
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
modelName: "AgentConfigPromptBuildResponseToUser",
tableName: "agent_config_prompt_build_response_to_user",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default BuildResponseToUser;

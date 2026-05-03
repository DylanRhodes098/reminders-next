import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class BuildResponseToUser extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentConfigBuildResponseToUser) {
return sequelize.models.AgentConfigBuildResponseToUser;
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
modelName: "AgentConfigBuildResponseToUser",
tableName: "agent_config_build_response_to_user",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default BuildResponseToUser;

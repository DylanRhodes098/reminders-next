import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class BuildResponseToUser extends Model {}
export const hotReloads = () => {
if (sequelize.models.AgentStepConfigBuildResponseToUser) {
return sequelize.models.AgentStepConfigBuildResponseToUser;
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
modelName: "AgentStepConfigBuildResponseToUser",
tableName: "agent_step_config_build_response_to_user",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default BuildResponseToUser;

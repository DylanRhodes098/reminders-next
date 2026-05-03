import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class UserRequest extends Model {}
export const hotReloads = () => {
if (sequelize.models.UserRequest) {
return sequelize.models.UserRequest;
}
};
UserRequest.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
agentConfigId: {
type: DataTypes.UUID,
allowNull: true,
},
buildPromptToLlmId: {
type: DataTypes.UUID,
allowNull: true,
},
inputId: {
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
modelName: "UserRequest",
tableName: "user_request",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default UserRequest;

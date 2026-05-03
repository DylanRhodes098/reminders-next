import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Action extends Model {}
export const hotReloads = () => {
if (sequelize.models.Action) {
return sequelize.models.Action;
}
};
Action.init(
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
type: {
type: DataTypes.STRING,
allowNull: true,
},
name: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
},
},
data: {
type: DataTypes.JSONB,
allowNull: true,
},
stateUpdateId: {
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
modelName: "Action",
tableName: "action",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Action;

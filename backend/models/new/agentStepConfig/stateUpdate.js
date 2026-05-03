import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class StateUpdate extends Model {}
export const hotReloads = () => {
if (sequelize.models.StateUpdate) {
return sequelize.models.StateUpdate;
}
};
StateUpdate.init(
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
modelName: "StateUpdate",
tableName: "state_update",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default StateUpdate;

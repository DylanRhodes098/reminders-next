import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Input extends Model {}
export const hotReloads = () => {
if (sequelize.models.Input) {
return sequelize.models.Input;
}
};
Input.init(
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
modelName: "Input",
tableName: "input",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Input;

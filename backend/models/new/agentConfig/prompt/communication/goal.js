import sequelize from "../../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Goal extends Model {}
export const hotReloads = () => {
if (sequelize.models.Goal) {
return sequelize.models.Goal;
}
};
Goal.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
name: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
},
},

description: {
type: DataTypes.TEXT,
allowNull: true,
},

priority: {
type: DataTypes.INTEGER,
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
modelName: "Goal",
tableName: "goal",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Goal;

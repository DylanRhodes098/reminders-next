import sequelize from "../../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Memory extends Model {}
export const hotReloads = () => {
if (sequelize.models.Memory) {
return sequelize.models.Memory;
}
};
Memory.init(
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
key: {
type: DataTypes.STRING,
allowNull: true,
},
value: {
type: DataTypes.JSON,
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
modelName: "Memory",
tableName: "memory",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Memory;

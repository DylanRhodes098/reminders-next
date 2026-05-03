import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ToolResult extends Model {}
export const hotReloads = () => {
if (sequelize.models.ToolResult) {
return sequelize.models.ToolResult;
}
};
ToolResult.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
data: {
type: DataTypes.JSONB,
allowNull: true,
},

success: {
type: DataTypes.BOOLEAN,
allowNull: true,
},

error: {
type: DataTypes.TEXT,
allowNull: true,
},

toolExecutionsId: {
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
modelName: "ToolResult",
tableName: "tool_result",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ToolResult;

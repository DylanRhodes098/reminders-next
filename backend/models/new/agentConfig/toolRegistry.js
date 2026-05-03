import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ToolRegistry extends Model {}
export const hotReloads = () => {
if (sequelize.models.ToolRegistry) {
return sequelize.models.ToolRegistry;
}
};
ToolRegistry.init(
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
modelName: "ToolRegistry",
tableName: "tool_registry",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ToolRegistry;

import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ToolTags extends Model {}
export const hotReloads = () => {
if (sequelize.models.ToolTags) {
return sequelize.models.ToolTags;
}
};
ToolTags.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
value: {
type: DataTypes.STRING,
allowNull: true,
},

toolsId: {
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
modelName: "ToolTags",
tableName: "tool_tags",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ToolTags;

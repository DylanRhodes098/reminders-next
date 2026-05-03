import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class ToolParameters extends Model {}
export const hotReloads = () => {
if (sequelize.models.ToolParameters) {
return sequelize.models.ToolParameters;
}
};
ToolParameters.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
schema: {
type: DataTypes.JSONB,
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
modelName: "ToolParameters",
tableName: "tool_parameters",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default ToolParameters;

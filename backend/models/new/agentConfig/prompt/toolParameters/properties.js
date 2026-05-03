import sequelize from "../../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class Properties extends Model {}
export const hotReloads = () => {
if (sequelize.models.Properties) {
return sequelize.models.Properties;
}
};
Properties.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
toolParametersId: {
type: DataTypes.UUID,
allowNull: true,
},
schema: {
type: DataTypes.JSONB,
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
modelName: "Properties",
tableName: "properties",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default Properties;

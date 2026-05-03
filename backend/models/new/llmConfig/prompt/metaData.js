import sequelize from "../../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class MetaData extends Model {}
export const hotReloads = () => {
if (sequelize.models.MetaData) {
return sequelize.models.MetaData;
}
};
MetaData.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
promptId: {
type: DataTypes.UUID,
allowNull: true,
},
temperature: {
type: DataTypes.FLOAT,
allowNull: true,
},
maxTokens: {
type: DataTypes.INTEGER,
allowNull: true,
},
requestId: {
type: DataTypes.STRING,
allowNull: true,
},
promptInputId: {
type: DataTypes.UUID,
allowNull: true,
},
builtPromptToLlmId: {
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
modelName: "MetaData",
tableName: "meta_data",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default MetaData;

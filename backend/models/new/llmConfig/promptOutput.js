import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class PromptOutput extends Model {}
export const hotReloads = () => {
if (sequelize.models.PromptOutput) {
return sequelize.models.PromptOutput;
}
};
PromptOutput.init(
{
id: {
type: DataTypes.UUID,
allowNull: false,
primaryKey: true,
defaultValue: DataTypes.UUIDV4,
},
llmConfigId: {
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
modelName: "PromptOutput",
tableName: "prompt_output",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default PromptOutput;

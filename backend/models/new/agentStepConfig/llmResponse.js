import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";
export class LlmResponse extends Model {}
export const hotReloads = () => {
if (sequelize.models.LlmResponse) {
return sequelize.models.LlmResponse;
}
};
LlmResponse.init(
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
modelName: "LlmResponse",
tableName: "llm_response",
freezeTableName: true,
timestamps: true,
underscored: false,
}
);
export default LlmResponse;

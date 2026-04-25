import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";

export class AgentSubFolder extends Model {}

export const hotReloads = () => {
  if (sequelize.models.AgentSubFolder) {
    return sequelize.models.AgentSubFolder;
  }
};

AgentSubFolder.init(
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

    agentFolderId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    agentId: {
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
    modelName: "AgentSubFolder",
    tableName: "agent_sub_folder",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
  }
);

export default AgentSubFolder;

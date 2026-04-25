import sequelize from "../../../lib/db.js";
import { Model, DataTypes } from "sequelize";

export class AgentFolder extends Model {}

export const hotReloads = () => {
  if (sequelize.models.AgentFolder) {
    return sequelize.models.AgentFolder;
  }
};

AgentFolder.init(
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

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUUID: 4,
      },
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
    modelName: "AgentFolder",
    tableName: "agent_folder",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
  }
);

export default AgentFolder;

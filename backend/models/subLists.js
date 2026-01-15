// Import libararies //
import sequelize from "../lib/db.js";

import {Model, DataTypes} from "sequelize";

export class SubLists extends Model {}

export const hotReloads = () => {
if (sequelize.models.SubLists) {
    return sequelize.models.SubLists;
}
}

SubLists.init ({
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

  // foreign key
  folderId: {
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
            modelName: "SubLists",
            tableName: "sublists",
            freezeTableName: true,
            timestamps: true,
            underscored: false,
          }
        );
    
export default SubLists;

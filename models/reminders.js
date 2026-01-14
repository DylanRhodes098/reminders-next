// Import libararies //
import sequelize from "../lib/db.js";

import {Model, DataTypes} from "sequelize";

export class Reminders extends Model {}

export const hotReloads = () => {
if (sequelize.models.Reminders) {
    return sequelize.models.Reminders;
}
}

Reminders.init ({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  note: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  date_of_reminder: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString(), // must be in the past
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

  subListId: {
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
            modelName: "Reminders",
            tableName: "reminders",
            freezeTableName: true,
            timestamps: true,
            underscored: false,
          }
        );
    
export default Reminders;

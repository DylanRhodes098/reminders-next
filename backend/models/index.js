// Import libararies //
import sequelize from "../lib/db";
import { DataTypes } from "sequelize";

// Import model files //

import User from "./user.js";
import List from "./list.js";
import Folder from "./folder.js";
import SubLists from "./subLists.js";
import ReminderFolder from "./reminderFolder.js";
import Reminders from "./reminders.js";


console.log("[models] registered:", Object.keys(sequelize.models));

// Create hasmany relationships //
if (!User.associations?.folders) 
    User.hasMany(Folder, {
    foreignKey: 'userId',
    as: 'folders'
});

if (!Folder.associations?.subLists) 
    Folder.hasMany(SubLists, {
    foreignKey: 'folderId',
    as: 'subLists'
});

if (!SubLists.associations?.reminders) 
    SubLists.hasMany(Reminders, {
    foreignKey: 'subListId',
    as: 'reminders'
});

if (!User.associations?.reminderFolders) 
    User.hasMany(ReminderFolder, {
    foreignKey: 'userId',
    as: 'reminderFolders'
});

if (!SubLists.associations?.reminderFolders) 
    SubLists.hasMany(ReminderFolder, {
    foreignKey: 'subListId',
    as: 'reminderFolders'
});


// Create belongsto relationships //
if (!Folder.associations?.user)
    Folder.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  
  // SubLists belongs to Folder
  if (!SubLists.associations?.folder)
    SubLists.belongsTo(Folder, {
      foreignKey: 'folderId',
      as: 'folder',
    });
  
  // Reminders belongs to SubLists
  if (!Reminders.associations?.subList)
    Reminders.belongsTo(SubLists, {
      foreignKey: 'subListId',
      as: 'subList',
    });

  // ReminderFolder belongs to User
  if (!ReminderFolder.associations?.user)
    ReminderFolder.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });

  // ReminderFolder belongs to SubLists
  if (!ReminderFolder.associations?.subList)
    ReminderFolder.belongsTo(SubLists, {
      foreignKey: 'subListId',
      as: 'subList',
    });

      export { User, Folder, List, SubLists, Reminders, ReminderFolder };

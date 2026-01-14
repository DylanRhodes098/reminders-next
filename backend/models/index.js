// Import libararies //
import sequelize from "../lib/db";
import { DataTypes } from "sequelize";

// Import model files //

import User from "./user.js";
import List from "./list.js";
import Folder from "./folder.js";
import SubLists from "./subLists.js";
import Reminders from "./reminders.js";


console.log("[models] registered:", Object.keys(sequelize.models));

// Create hasmany relationships //
if (!User.associations?.folder) 
    User.hasMany(Folder, {
    foreignKey: 'usersFolder',
    as: 'folder'
});

if (!Folder.associations?.subLists) 
    Folder.hasMany(SubLists, {
    foreignKey: 'SubLists',
    as: 'subLists'
});

if (!SubLists.associations?.reminders) 
    SubLists.hasMany(Reminders, {
    foreignKey: 'Reminders',
    as: 'reminders'
});


// Create belongsto relationships //
if (!Folder.associations?.user)
    Folder.belongsTo(User, {
      foreignKey: 'usersFolder',
      as: 'user',
    });
  
  // SubLists belongs to Folder
  if (!SubLists.associations?.folder)
    SubLists.belongsTo(Folder, {
      foreignKey: 'SubLists',
      as: 'folder',
    });
  
  // Reminders belongs to SubLists
  if (!Reminders.associations?.subList)
    Reminders.belongsTo(SubLists, {
      foreignKey: 'Reminders',
      as: 'subList',
    });

      export { User, Folder, List, SubLists, Reminders };

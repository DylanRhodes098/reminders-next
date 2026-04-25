// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Defines limits on tools and actions a user can create //

// factory/createTools/toolFactory.ts // 

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - Policy model class - - - //
export class Policy extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named Policy //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if Policy model exists already //
  // * * * //
if (sequelize.models.Policy) {

    // < - return model - > //
    return sequelize.models.Policy;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
Policy.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  allowedTools: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  blockedTools: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  maxToolCalls: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },

  maxRuntimeMs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 120000,
  },

  requiresHumanApprovalFor: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  dataHandling: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  budgetLimit: {
    type: DataTypes.FLOAT,
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

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Options
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
          {
            // < - Attach the model to this database - > //
            sequelize,

            // < - Name the model to be identified throughout the project - > //
            modelName: "Policy",

            // < - Name the table with the actual data in it - > //
            tableName: "policy",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default Policy;

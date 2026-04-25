// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Stores the Agent Infomration//
// Allows runs to execute //
// Allows CRUD // 

// /createAgent/agentFactory //


/**
 *  Goals 
    Language
    Registry
    LLM response 
    Environment
    max parse retries
*/

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - Agent model class - - - //
export class Agent extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named Agent //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if Agent model exists already //
  // * * * //
if (sequelize.models.Agent) {

    // < - return model - > //
    return sequelize.models.Agent;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
Agent.init ({

  // < - attributes - > //
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

  maxIterations: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 8,
  },

  defaultRunTimeoutMs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 120000,
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
            modelName: "Agent",

            // < - Name the table with the actual data in it - > //
            tableName: "agent",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default Agent;

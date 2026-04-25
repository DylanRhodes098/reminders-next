// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Stores the Agent Memory Infomration on each runtime //

// coreFunctionality/agent/Agent.ts // 

/**
 * UserRequest = string
 * LLMResponse = string
 * toolsRequested = string[]
 * toolsExecuted = string[]
 * toolsResults = string[]
 * Terminated = boolean
*/

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - Memory model class - - - //
export class Memory extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named Memory //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if Memory model exists already //
  // * * * //
if (sequelize.models.Memory) {

    // < - return model - > //
    return sequelize.models.Memory;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
Memory.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  agentId: {
    type: DataTypes.UUID,
    allowNull: true,
    validate: {
      isUUID: 4,
    },
  },

  runId: {
    type: DataTypes.UUID,
    allowNull: true,
    validate: {
      isUUID: 4,
    },
  },

  kind: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "base",
  },

  config: {
    type: DataTypes.JSON,
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
            modelName: "Memory",

            // < - Name the table with the actual data in it - > //
            tableName: "memory",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default Memory;

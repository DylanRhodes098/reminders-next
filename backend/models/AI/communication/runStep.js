// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Tracks each step in one run loop, good for error handling a debugging //

// communication / AgentLanguage.ts = REBUILD PROMPT // 

/**
 * userRequest = string
 * prompt = string
 * llmResponse = string
 * toolsRequested = string[]
 * toolsExecuted = string[]
 * toolsResults = string[]
 * iterationNumber = number
 * terminated = boolean
 * errorMessage = string
 * errorCode = string
 * errorSource = string
 * errorDetails = string
*/

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - RunStep model class - - - //
export class RunStep extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named RunStep //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if RunStep model exists already //
  // * * * //
if (sequelize.models.RunStep) {

    // < - return model - > //
    return sequelize.models.RunStep;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
RunStep.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  // < - foriegn keys (attributes that belong to something else) - > //
  runId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  payload: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
            modelName: "RunStep",

            // < - Name the table with the actual data in it - > //
            tableName: "runStep",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default RunStep;

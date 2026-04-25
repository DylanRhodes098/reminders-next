// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Executes and tracks one run of the agent //
// Also tracks errors and status //

// GAMEAgent.ts = EXECUTE FUNCTION // 

/**
 * prompt
 * response
 * action
 * result
 * terminated
 * error message
 * error code
 * error source
 * error details
*/

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - AgentRun model class - - - //
export class AgentRun extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named AgentRun //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if AgentRun model exists already //
  // * * * //
if (sequelize.models.AgentRun) {

    // < - return model - > //
    return sequelize.models.AgentRun;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
AgentRun.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  // < - foriegn keys (attributes that belong to something else) - > //
  agentId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUUID: 4,
    },
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "queued",
  },

  startedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  endedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  iterations: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  input: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  output: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  error: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  usage: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  trace: {
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
            modelName: "AgentRun",

            // < - Name the table with the actual data in it - > //
            tableName: "agentRun",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default AgentRun;

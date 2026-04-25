// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Tracks the tool request from the LLM to the agent //

// coreFunctionality/llm/Tool.ts //
// coreFunctionality/agent/fileTools.ts //
// coreFunctionality / llm / prompt.ts //
// coreFunctionality / agent / Agent.ts //

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - ToolCall model class - - - //
export class ToolCall extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named ToolCall //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if ToolCall model exists already //
  // * * * //
if (sequelize.models.ToolCall) {

    // < - return model - > //
    return sequelize.models.ToolCall;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
ToolCall.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  toolName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  arguments: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  requestedByMessageId: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },

  runId: {
    type: DataTypes.UUID,
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
            modelName: "ToolCall",

            // < - Name the table with the actual data in it - > //
            tableName: "toolCall",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default ToolCall;

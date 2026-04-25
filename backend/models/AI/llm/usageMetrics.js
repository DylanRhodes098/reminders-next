// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Tracks the LLMs usage when executing an agent run//

// coreFunctionality/llm/LLM.ts //

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - UsageMetrics model class - - - //
export class UsageMetrics extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named UsageMetrics //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if UsageMetrics model exists already //
  // * * * //
if (sequelize.models.UsageMetrics) {

    // < - return model - > //
    return sequelize.models.UsageMetrics;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
UsageMetrics.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  promptTokens: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  completionTokens: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  totalTokens: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  estimatedCost: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },

  llmLatencyMs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  toolLatencyMs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  totalLatencyMs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
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
            modelName: "UsageMetrics",

            // < - Name the table with the actual data in it - > //
            tableName: "usageMetrics",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default UsageMetrics;

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Stores LLM infomration to wire the correct LLM to the application //

// coreFunctionality/llm/LLM.ts // 

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - LLMClientConfig model class - - - //
export class LLMClientConfig extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named LLMClientConfig //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if LLMClientConfig model exists already //
  // * * * //
if (sequelize.models.LLMClientConfig) {

    // < - return model - > //
    return sequelize.models.LLMClientConfig;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
LLMClientConfig.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  apiKeyRef: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.2,
  },

  topP: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1,
  },

  maxInputTokens: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  maxOutputTokens: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  timeoutMs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 30000,
  },

  retryPolicy: {
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
            modelName: "LLMClientConfig",

            // < - Name the table with the actual data in it - > //
            tableName: "llmClientConfig",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default LLMClientConfig;

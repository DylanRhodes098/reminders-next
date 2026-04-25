// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Stores the tool information if creating a new tool or tracking a requested tool //

// createTools/toolFactory.ts //
// coreFunctionality/llm/Tool.ts //
// coreFunctionality/agent/fileTools.ts //

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - Tool model class - - - //
export class Tool extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named Tool //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if Tool model exists already //
  // * * * //
if (sequelize.models.Tool) {

    // < - return model - > //
    return sequelize.models.Tool;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
Tool.init ({

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
    unique: true,
    validate: {
      notEmpty: true,
    },
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  parametersSchema: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  resultSchema: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  tags: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  terminal: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  timeoutMs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10000,
  },

  idempotent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  sideEffectLevel: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "read",
  },

  version: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "1.0.0",
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
            modelName: "Tool",

            // < - Name the table with the actual data in it - > //
            tableName: "tool",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default Tool;

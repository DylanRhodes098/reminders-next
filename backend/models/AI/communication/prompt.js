// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Stores infomration to build a suitable prompt for the llm //

// communication/AgentLanguage.ts = BUILD PROMPT // 

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - Prompt model class - - - //
export class Prompt extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named Prompt //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if Prompt model exists already //
  // * * * //
if (sequelize.models.Prompt) {

    // < - return model - > //
    return sequelize.models.Prompt;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
Prompt.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  messages: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  tools: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  responseSchema: {
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
            modelName: "Prompt",

            // < - Name the table with the actual data in it - > //
            tableName: "prompt",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default Prompt;

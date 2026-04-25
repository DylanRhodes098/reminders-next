// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Stores and tracks each message in a loop, can be any role //

// coreFunctionality/llm/Message.ts //
// coreFuncitonality/llm/prompt.ts //

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - Message model class - - - //
export class Message extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named Message //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if Message model exists already //
  // * * * //
if (sequelize.models.Message) {

    // < - return model - > //
    return sequelize.models.Message;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
Message.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  toolCallId: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  // < - foriegn keys (attributes that belong to something else) - > //
  runId: {
    type: DataTypes.UUID,
    allowNull: true,
    validate: {
      isUUID: 4,
    },
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
            modelName: "Message",

            // < - Name the table with the actual data in it - > //
            tableName: "message",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default Message;

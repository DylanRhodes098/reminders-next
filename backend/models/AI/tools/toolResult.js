// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Tracks the result of an executed tool (success or error) //

// comunication/ActionResult.ts //

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - ToolResult model class - - - //
export class ToolResult extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named ToolResult //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if ToolResult model exists already //
  // * * * //
if (sequelize.models.ToolResult) {

    // < - return model - > //
    return sequelize.models.ToolResult;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
ToolResult.init ({

  // < - attributes - > //
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  // < - foriegn keys (attributes that belong to something else) - > //
  toolCallId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUUID: 4,
    },
  },

  ok: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

  data: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  error: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  latencyMs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  completedAt: {
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
            modelName: "ToolResult",

            // < - Name the table with the actual data in it - > //
            tableName: "toolResult",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default ToolResult;

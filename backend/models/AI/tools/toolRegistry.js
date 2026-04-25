// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// USECASE //

// Stores ToolRegistry infromation to create a new toolregistry or use CRUD

// factory/createTools/toolFactory/toolRegistry.ts //

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import files - > //
import sequelize from "../../../lib/db.js";

// < - Import Libararies - > //
import {Model, DataTypes} from "sequelize";

// - - - ToolRegistry model class - - - //
export class ToolRegistry extends Model {}

// »« - »« »« - »« »« - »« //
// Function to confirm if sequalize alreayd has a model named ToolRegistry //
// »« - »« »« - »« »« - »« //
export const hotReloads = () => {

  // * * * //
  // if ToolRegistry model exists already //
  // * * * //
if (sequelize.models.ToolRegistry) {

    // < - return model - > //
    return sequelize.models.ToolRegistry;
}
}

// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
// Attributes
// ‡ - ‡ ‡ - ‡ ‡ - ‡ //
ToolRegistry.init ({

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
    validate: {
      notEmpty: true,
    },
  },

  tags: {
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
            modelName: "ToolRegistry",

            // < - Name the table with the actual data in it - > //
            tableName: "toolRegistry",

            // < - Do not change or pluralise the table name - > //
            freezeTableName: true,

            // < - Automatically add createdat and updatedat - > //
            timestamps: true,

            // < - Should timestamps be camelCase r underscore cased (cretaed_at) - > //
            underscored: false,
          }
        );
    
export default ToolRegistry;

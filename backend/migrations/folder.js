'use-strict';

// Initiate async up function //
export async function up(queryInterface, Sequelize) {

// Define queryinterface method //
await queryInterface.createTable('folder', {
// Add data //
 id: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
 
   // foreign key
   userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW'),
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW'),
  },
})
}

// Initiate async up function //
export async function down(queryInterface, Sequelize) {

    // Define queryinterface method //
    await queryInterface.dropTable('folder')};
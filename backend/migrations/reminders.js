'use-strict';

// Initiate async up function //
export async function up(queryInterface, Sequelize) {

// Define queryinterface method //
await queryInterface.createTable('reminders', {
// Add data //
 id: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date_of_reminder: {
    type: Sequelize.DATE,
    allowNull: false,
  },

   // foreign key
   folderId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  subListId: {
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
    await queryInterface.dropTable('reminders')};
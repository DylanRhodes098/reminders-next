'use strict';

// Add reminderFolderId column to reminders table //
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('reminders', 'reminderFolderId', {
    type: Sequelize.UUID,
    allowNull: true,
  });
}

// Remove reminderFolderId column from reminders table //
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('reminders', 'reminderFolderId');
}

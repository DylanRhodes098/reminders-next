'use strict';

// Add reminderFolderId column to reminders table //
// Note: This migration is for existing databases. Fresh databases will have this column
// created by the reminders.js migration. This migration checks if the column exists
// before trying to add it to avoid duplicate column errors.
export async function up(queryInterface, Sequelize) {
  try {
    // Check if column already exists
    const tableDescription = await queryInterface.describeTable('reminders');
    if (!tableDescription.reminderFolderId) {
      await queryInterface.addColumn('reminders', 'reminderFolderId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'reminderFolder',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  } catch (error) {
    // If table doesn't exist, that's fine - the base reminders.js migration will create it with the column
    if (error.name !== 'SequelizeDatabaseError' || !error.message.includes("doesn't exist")) {
      throw error;
    }
  }
}

// Remove reminderFolderId column from reminders table //
export async function down(queryInterface, Sequelize) {
  try {
    const tableDescription = await queryInterface.describeTable('reminders');
    if (tableDescription.reminderFolderId) {
      await queryInterface.removeColumn('reminders', 'reminderFolderId');
    }
  } catch (error) {
    // If table doesn't exist, nothing to do
    if (error.name !== 'SequelizeDatabaseError' || !error.message.includes("doesn't exist")) {
      throw error;
    }
  }
} 
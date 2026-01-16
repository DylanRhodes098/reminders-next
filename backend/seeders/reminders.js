'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('reminders', [
    {
      id: 'c1e8b3a6-4d2a-4f9e-9a6b-8d2e4f1a7c55',
      note: 'Stand-up meeting',
      date_of_reminder: new Date(Date.now() + 60 * 60 * 1000),
      subListId: '3f8c2c6a-2d1e-4e4a-8f55-9c6f2f7e3a91', // Morning
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '9b4e7f2d-3c8a-4e91-8a6d-1f2c9b7e5d33',
      note: 'Gym session',
      date_of_reminder: new Date(Date.now() + 24 * 60 * 60 * 1000),
      subListId: '8a6e3b1c-5d14-4c8e-9b7f-1f3c6a9e2d44', // Evening
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('reminders', null, {});
}

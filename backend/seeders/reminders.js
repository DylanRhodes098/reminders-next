'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('reminders', [
    {
      id: '77777777-7777-7777-7777-777777777777',
      note: 'Stand-up meeting',
      date_of_reminder: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      subListId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '88888888-8888-8888-8888-888888888888',
      note: 'Gym session',
      date_of_reminder: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      subListId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('reminders', null, {});
}

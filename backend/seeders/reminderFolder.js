'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('reminderFolder', [
    {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      name: 'Work Reminders',
      userId: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
      subListId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      name: 'Personal Reminders',
      userId: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
      subListId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('reminderFolder', null, {});
}

'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('sublists', [
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Morning',
      remindersId: '33333333-3333-3333-3333-333333333333',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '66666666-6666-6666-6666-666666666666',
      name: 'Evening',
      remindersId: '44444444-4444-4444-4444-444444444444',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('sublists', null, {});
}

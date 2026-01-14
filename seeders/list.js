'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('list', [
    {
      id: '33333333-3333-3333-3333-333333333333',
      name: 'Daily Tasks',
      folderId: '11111111-1111-1111-1111-111111111111',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '44444444-4444-4444-4444-444444444444',
      name: 'Fitness',
      folderId: '22222222-2222-2222-2222-222222222222',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('list', null, {});
}

'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('folder', [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Work',
      createdAt: new Date(),
      updatedAt: new Date(),
      subListId: '33333333-3333-3333-3333-333333333333'
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Personal',
      createdAt: new Date(),
      updatedAt: new Date(),
      subListId: '33333333-3333-3333-3333-333333333332'
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('folder', null, {});
}

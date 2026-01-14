'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('folder', [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Work',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Personal',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('folder', null, {});
}

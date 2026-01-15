'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('sublists', [
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Morning',
      folderId: '11111111-1111-1111-1111-111111111111',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '66666666-6666-6666-6666-666666666666',
      name: 'Evening',
      folderId: '22222222-2222-2222-2222-222222222222',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('sublists', null, {});
}

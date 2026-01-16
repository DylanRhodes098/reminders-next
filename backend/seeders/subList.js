'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('sublists', [
    {
      id: '3f8c2c6a-2d1e-4e4a-8f55-9c6f2f7e3a91',
      name: 'Morning',
      folderId: '6e91ebe5-7b6d-44ee-9f3c-ac135632f7ea', // Work
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '8a6e3b1c-5d14-4c8e-9b7f-1f3c6a9e2d44',
      name: 'Evening',
      folderId: 'b2f6d8c4-9a2e-4c0b-8e6a-7a1f6e9a42b1', // Personal
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('sublists', null, {});
}

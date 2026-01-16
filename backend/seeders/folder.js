'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('folder', [
    {
      id: '6e91ebe5-7b6d-44ee-9f3c-ac135632f7ea',
      name: 'Work',
      userId: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'b2f6d8c4-9a2e-4c0b-8e6a-7a1f6e9a42b1',
      name: 'Personal',
      userId: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('folder', null, {});
}

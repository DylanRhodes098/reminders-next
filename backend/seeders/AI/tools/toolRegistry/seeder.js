'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('toolRegistry', [
    {
      id: 'c1000000-0000-4000-8000-000000000001',
      name: 'default',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('toolRegistry', null, {});
}


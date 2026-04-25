'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('memory', [
    {
      id: 'a2000000-0000-4000-8000-000000000001',
      kind: 'base',
      config: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('memory', null, {});
}


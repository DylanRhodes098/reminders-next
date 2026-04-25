'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('agent', [
    {
      id: 'a0000000-0000-4000-8000-000000000001',
      name: 'Default Agent',
      maxIterations: 8,
      defaultRunTimeoutMs: 120000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('agent', null, {});
}


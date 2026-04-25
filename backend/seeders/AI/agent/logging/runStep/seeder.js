'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('runStep', [
    {
      id: 'a6000000-0000-4000-8000-000000000001',
      runId: 'a1000000-0000-4000-8000-000000000001',
      type: 'demo',
      payload: {},
      timestamp: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('runStep', null, {});
}


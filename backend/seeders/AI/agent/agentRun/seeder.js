'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('agentRun', [
    {
      id: 'a1000000-0000-4000-8000-000000000001',
      agentId: 'a0000000-0000-4000-8000-000000000001',
      status: 'queued',
      startedAt: new Date(),
      endedAt: null,
      iterations: 0,
      input: null,
      output: null,
      error: null,
      usage: null,
      trace: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('agentRun', null, {});
}


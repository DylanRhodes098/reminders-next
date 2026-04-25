'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('agentError', [
    {
      id: 'a5000000-0000-4000-8000-000000000001',
      code: 'DEMO_ERROR',
      message: 'Seeded error for development',
      retryable: false,
      source: 'system',
      details: null,
      occurredAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('agentError', null, {});
}


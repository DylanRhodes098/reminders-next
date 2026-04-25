'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('toolCall', [
    {
      id: 'b2000000-0000-4000-8000-000000000001',
      toolName: 'demo_tool',
      arguments: {},
      requestedByMessageId: null,
      status: 'pending',
      runId: 'a1000000-0000-4000-8000-000000000001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('toolCall', null, {});
}


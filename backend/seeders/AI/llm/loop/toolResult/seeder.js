'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('toolResult', [
    {
      id: 'b3000000-0000-4000-8000-000000000001',
      toolCallId: 'b2000000-0000-4000-8000-000000000001',
      ok: true,
      data: { ok: true },
      error: null,
      latencyMs: 0,
      completedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('toolResult', null, {});
}


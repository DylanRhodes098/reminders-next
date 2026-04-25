'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('usageMetrics', [
    {
      id: 'b1000000-0000-4000-8000-000000000001',
      promptTokens: 10,
      completionTokens: 20,
      totalTokens: 30,
      estimatedCost: 0,
      llmLatencyMs: 0,
      toolLatencyMs: 0,
      totalLatencyMs: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('usageMetrics', null, {});
}


'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('policy', [
    {
      id: 'c2000000-0000-4000-8000-000000000001',
      allowedTools: null,
      blockedTools: null,
      maxToolCalls: 10,
      maxRuntimeMs: 120000,
      requiresHumanApprovalFor: null,
      dataHandling: null,
      budgetLimit: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('policy', null, {});
}


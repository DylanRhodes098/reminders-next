'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('tool', [
    {
      id: 'c0000000-0000-4000-8000-000000000001',
      name: 'demo_tool',
      description: 'A seeded tool for development',
      parametersSchema: null,
      resultSchema: null,
      tags: null,
      terminal: false,
      timeoutMs: 10000,
      idempotent: true,
      sideEffectLevel: 'read',
      version: '1.0.0',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('tool', null, {});
}


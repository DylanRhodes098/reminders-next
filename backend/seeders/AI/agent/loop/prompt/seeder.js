'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('prompt', [
    {
      id: 'a3000000-0000-4000-8000-000000000001',
      messages: [],
      tools: [],
      metadata: {},
      responseSchema: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('prompt', null, {});
}


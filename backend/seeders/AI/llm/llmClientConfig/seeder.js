'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('llmClientConfig', [
    {
      id: 'b0000000-0000-4000-8000-000000000001',
      provider: 'openai',
      model: 'gpt-4.1-mini',
      apiKeyRef: null,
      temperature: 0.2,
      topP: 1,
      maxInputTokens: null,
      maxOutputTokens: null,
      timeoutMs: 30000,
      retryPolicy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('llmClientConfig', null, {});
}


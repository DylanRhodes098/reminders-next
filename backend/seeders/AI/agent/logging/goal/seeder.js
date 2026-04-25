'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('goal', [
    {
      id: 'a4000000-0000-4000-8000-000000000001',
      title: 'Demo Goal',
      description: 'A seeded goal for development',
      priority: 1,
      successCriteria: null,
      constraints: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('goal', null, {});
}


'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('agent_folder', [
    {
      id: 'afc0e000-0001-4000-8000-000000000001',
      name: 'Agent Work',
      userId: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'afc0e000-0002-4000-8000-000000000002',
      name: 'Agent Personal',
      userId: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('agent_folder', null, {});
}

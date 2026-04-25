'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('agent_sub_folder', [
    {
      id: 'bfc0e000-0001-4000-8000-000000000001',
      name: 'Agent Session A',
      agentFolderId: 'afc0e000-0001-4000-8000-000000000001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'bfc0e000-0002-4000-8000-000000000002',
      name: 'Agent Session B',
      agentFolderId: 'afc0e000-0002-4000-8000-000000000002',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('agent_sub_folder', null, {});
}

'use strict';

/** Runs after agentSubFolder.js — allow agent_sub_folder rows without a parent agent_folder */
export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('agent_sub_folder', 'agentFolderId', {
    type: Sequelize.UUID,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('agent_sub_folder', 'agentFolderId', {
    type: Sequelize.UUID,
    allowNull: false,
  });
}

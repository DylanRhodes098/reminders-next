'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('agent_sub_folder', 'agentId', {
    type: Sequelize.DataTypes.UUID,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('agent_sub_folder', 'agentId');
}


'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('memory', 'agentId', {
    type: Sequelize.DataTypes.UUID,
    allowNull: true,
  });

  await queryInterface.addColumn('memory', 'runId', {
    type: Sequelize.DataTypes.UUID,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('memory', 'runId');
  await queryInterface.removeColumn('memory', 'agentId');
}


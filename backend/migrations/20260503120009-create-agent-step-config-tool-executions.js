'use-strict';

// Initiate async up function //
export async function up(queryInterface, Sequelize) {

  // Define queryinterface method //
  await queryInterface.createTable('agent_step_config_tool_executions', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },

    agentStepId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    success: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    },

    error: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
}

// Initiate async down function //
export async function down(queryInterface, Sequelize) {

  // Define queryinterface method //
  await queryInterface.dropTable('agent_step_config_tool_executions');
}

'use-strict';

// Initiate async up function //
export async function up(queryInterface, Sequelize) {

  // Define queryinterface method //
  await queryInterface.createTable('agent_config_tool_calls_request', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },

    promptId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    toolId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    toolName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },

    args: {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
    },

    receivePromptFromLlmId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    toolExecutionId: {
      type: Sequelize.DataTypes.UUID,
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
  await queryInterface.dropTable('agent_config_tool_calls_request');
}

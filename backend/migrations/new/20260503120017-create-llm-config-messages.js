'use-strict';

// Initiate async up function //
export async function up(queryInterface, Sequelize) {

  // Define queryinterface method //
  await queryInterface.createTable('llm_config_messages', {
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

    role: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },

    content: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    },

    promptInputId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    promptOutputId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    builtPromptToLlmId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    llmResponseId: {
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
  await queryInterface.dropTable('llm_config_messages');
}

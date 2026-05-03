'use-strict';

// Initiate async up function //
export async function up(queryInterface, Sequelize) {

  // Define queryinterface method //
  await queryInterface.createTable('tools', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },

    agentConfigId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    },

    terminal: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    },

    toolRegistryId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    promptInputId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
    },

    builtPromptToLlmId: {
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
  await queryInterface.dropTable('tools');
}

'use-strict';

// Initiate async up function //
export async function up(queryInterface, Sequelize) {

  // Define queryinterface method //
  await queryInterface.createTable('meta_data', {
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

    temperature: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: true,
    },

    maxTokens: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },

    requestId: {
      type: Sequelize.DataTypes.STRING,
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
  await queryInterface.dropTable('meta_data');
}

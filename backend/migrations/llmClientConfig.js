'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('llmClientConfig', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    provider: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apiKeyRef: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    temperature: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.2,
    },
    topP: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 1,
    },
    maxInputTokens: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    maxOutputTokens: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    timeoutMs: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 30000,
    },
    retryPolicy: {
      type: Sequelize.JSON,
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

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('llmClientConfig');
}


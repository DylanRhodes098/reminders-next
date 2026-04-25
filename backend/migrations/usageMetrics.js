'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('usageMetrics', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    promptTokens: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    completionTokens: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalTokens: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    estimatedCost: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    llmLatencyMs: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    toolLatencyMs: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalLatencyMs: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
  await queryInterface.dropTable('usageMetrics');
}


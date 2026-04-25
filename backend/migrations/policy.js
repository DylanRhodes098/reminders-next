'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('policy', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    allowedTools: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    blockedTools: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    maxToolCalls: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    maxRuntimeMs: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 120000,
    },
    requiresHumanApprovalFor: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    dataHandling: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    budgetLimit: {
      type: Sequelize.FLOAT,
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
  await queryInterface.dropTable('policy');
}


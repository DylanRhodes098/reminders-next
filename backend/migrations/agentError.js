'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('agentError', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    retryable: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    source: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'system',
    },
    details: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    occurredAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
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
  await queryInterface.dropTable('agentError');
}


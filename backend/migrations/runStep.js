'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('runStep', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    runId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'agentRun',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    payload: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    timestamp: {
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
  await queryInterface.dropTable('runStep');
}


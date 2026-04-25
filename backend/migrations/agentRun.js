'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('agentRun', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    agentId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'agent',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'queued',
    },
    startedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
    endedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    iterations: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    input: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    output: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    error: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    usage: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    trace: {
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
  await queryInterface.dropTable('agentRun');
}


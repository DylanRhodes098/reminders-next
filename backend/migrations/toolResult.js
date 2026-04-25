'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('toolResult', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    toolCallId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'toolCall',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    ok: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    data: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    error: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    latencyMs: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    completedAt: {
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
  await queryInterface.dropTable('toolResult');
}


'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('prompt', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    messages: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    tools: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    metadata: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    responseSchema: {
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
  await queryInterface.dropTable('prompt');
}


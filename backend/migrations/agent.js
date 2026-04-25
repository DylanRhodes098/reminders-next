'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('agent', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    maxIterations: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 8,
    },
    defaultRunTimeoutMs: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 120000,
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
  await queryInterface.dropTable('agent');
}


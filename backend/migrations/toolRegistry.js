'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('toolRegistry', {
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
    tags: {
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
  await queryInterface.dropTable('toolRegistry');
}


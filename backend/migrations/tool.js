'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('tool', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    parametersSchema: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    resultSchema: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    tags: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    terminal: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    timeoutMs: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10000,
    },
    idempotent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    sideEffectLevel: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'read',
    },
    version: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '1.0.0',
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
  await queryInterface.dropTable('tool');
}


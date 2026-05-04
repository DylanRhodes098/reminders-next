'use-strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('llm_config', 'apiKey', {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  });

  await queryInterface.addColumn('llm_config', 'model', {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  });

  await queryInterface.addColumn('llm_config', 'maxTokens', {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
  });

  await queryInterface.addColumn('llm_config', 'debug', {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('llm_config', 'debug');
  await queryInterface.removeColumn('llm_config', 'maxTokens');
  await queryInterface.removeColumn('llm_config', 'model');
  await queryInterface.removeColumn('llm_config', 'apiKey');
}

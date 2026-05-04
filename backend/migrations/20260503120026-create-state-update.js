'use-strict';

// Initiate async up function //
export async function up(queryInterface, Sequelize) {

  // Define queryinterface method //
  await queryInterface.createTable('state_update', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },

    agentStepId: {
      type: Sequelize.DataTypes.UUID,
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

// Initiate async down function //
export async function down(queryInterface, Sequelize) {

  // Define queryinterface method //
  await queryInterface.dropTable('state_update');
}

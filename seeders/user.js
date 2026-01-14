'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
        {
            id: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
            full_name: "james barret",
            email : "jamesbarret@gmail.com",
            password : "Imjames123."
        },
        {
            id: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ac',
            full_name: "Alice Example",
            email: "alice@example.com",
            password: "password123"
          },
          {
            id: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ad',
            full_name: "Bob Test",
            email: "bob@example.com",
            password: "password456"
          }
    ]);
  };

  export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users');
  };

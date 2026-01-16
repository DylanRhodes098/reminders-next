'use strict';

import bcrypt from 'bcryptjs';

export async function up(queryInterface, Sequelize) {
    // Hash passwords before inserting (bulkInsert doesn't trigger Sequelize hooks)
    const hashedPassword1 = await bcrypt.hash("Imjames123.", 10);
    const hashedPassword2 = await bcrypt.hash("password123", 10);
    const hashedPassword3 = await bcrypt.hash("password456", 10);

    await queryInterface.bulkInsert('Users', [
        {
            id: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ab',
            full_name: "james barret",
            email : "jamesbarret@gmail.com",
            password : hashedPassword1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ac',
            full_name: "Alice Example",
            email: "alice@example.com",
            password: hashedPassword2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 'd6f5d3b0-12ab-4c9f-bbbb-1234567890ad',
            full_name: "Bob Test",
            email: "bob@example.com",
            password: hashedPassword3,
            createdAt: new Date(),
            updatedAt: new Date()
          }
    ]);
  };

  export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users');
  };

'use-strict';

export async function up(queryInterface, Sequelize) {
  // message.toolCallId -> toolCall.id
  await queryInterface.addConstraint('message', {
    fields: ['toolCallId'],
    type: 'foreign key',
    name: 'fk_message_toolCallId_toolCall_id',
    references: {
      table: 'toolCall',
      field: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  // toolCall.requestedByMessageId -> message.id
  await queryInterface.addConstraint('toolCall', {
    fields: ['requestedByMessageId'],
    type: 'foreign key',
    name: 'fk_toolCall_requestedByMessageId_message_id',
    references: {
      table: 'message',
      field: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeConstraint(
    'message',
    'fk_message_toolCallId_toolCall_id'
  );
  await queryInterface.removeConstraint(
    'toolCall',
    'fk_toolCall_requestedByMessageId_message_id'
  );
}


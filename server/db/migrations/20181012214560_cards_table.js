exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', function(table) {
      table.increments().unique().notNullable();
      table.string('title', 255).notNullable();
      table.string('body', 1024).notNullable();

      table
      .integer('priority_id')
      .notNullable()
      .references('id')
      .inTable('priorities')
      .onDelete('CASCADE')
      .index();

      table
      .integer('status_id')
      .notNullable()
      .references('id')
      .inTable('statuses')
      .onDelete('CASCADE')
      .index();

      table
      .integer('created_by')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();

      table
      .integer('assigned_to')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards');
};

exports.up = function(knex, Promise) {
    return knex.schema.createTable('statuses', function(table) {
      table.increments().unique().notNullable();
      table.string('name').notNullable();
      table.integer('rank').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('statuses');
  }
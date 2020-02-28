
exports.up = function(knex) {
  return knex.schema.createTable('plants', plants => {
    plants.increments();
    plants.string('nickname', 255).unique().notNullable();
    plants.string('species', 255).notNullable();
    plants.integer('h2oFrequency', 10).notNullable();
    plants.string('image', 256);
    plants.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('plants');
};
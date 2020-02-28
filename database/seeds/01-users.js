const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Fred Thomas', password: bcrypt.hashSync('pass', 8), phoneNumber: "9895502785"},
        {username: 'Frank Billings', password: bcrypt.hashSync('youshallnotpass', 8), phoneNumber: "2458731125"},
        {username: 'John Smith', password: bcrypt.hashSync('myprecious', 8), phoneNumber: "2143459843"}
      ]);
    });
};
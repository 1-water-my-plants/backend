const db = require('../database/dbConfig.js');

function insert(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => id);
}

function find() {
  return db('users');
}

function findBy(where) {
  return db('users').where(where);
}

function findByUsername(username) {
  return findBy({ username }).first();
}

function update(changes, id) {
  return db('users').where({id: id}).update(changes)
      .then((res) => {
          return db('users').where({id});
      })
}

module.exports = {
  insert,
  update,
  find,
  findBy,
  findByUsername
}
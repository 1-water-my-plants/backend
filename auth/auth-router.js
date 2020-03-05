const router = require('express').Router();
const Users = require('./auth-model.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const server = express();
const plantsRouter = require('../plants/plants-router.js');
const authenticate = require('../auth/authenticate-middleware.js');

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'ihgkjhgykjghkjh', options);
}

router.post('/register', (req, res) => {
  const { username, password, phoneNumber } = req.body;
  const bcrypt = require('bcryptjs');

  Users.insert({ username, password: bcrypt.hashSync(password, 8), phoneNumber })
    .then(id => {
      res.status(201).json({ message: 'User registered', id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error registering user'});
    })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const bcrypt = require('bcryptjs'); 

  Users
  .findByUsername(username)
  .then(user => {
    let bcryptPass = bcrypt.compareSync(password, user.password);

    if (user && bcryptPass) {
      const token = generateToken(user);
      res.status(200).json({ message: 'User logged in', token, user });
    } else {
      res.status(401).json({ errorMessage: 'User credentials failed' });
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error registering user'});
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
  .then(user => {
    if (user) {
      Users.update(changes, id)
      .then(updatedUser => {
        res.json(updatedUser);
      });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

module.exports = router;
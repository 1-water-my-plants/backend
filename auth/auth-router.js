const router = require('express').Router();
const Users = require('./auth-model.js');
const jwt = require('jsonwebtoken');

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
  const { username, password } = req.body;
  const bcrypt = require('bcryptjs');

  Users.insert({ username, password: bcrypt.hashSync(password, 8) })
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
      res.status(200).json({ message: 'User logged in', token });
    } else {
      res.status(401).json({ errorMessage: 'User credentials failed' });
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error registering user'});
    })
});

module.exports = router;
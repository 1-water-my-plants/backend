const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || 'ihgkjhgykjghkjh', (err, decodedToken) => {
      if(err) {
        res.status(401).json({ errorMessage: "Token not valid"});
      } else {
        req.user = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({ errorMessage: "No authorization token provided"});
  }
}
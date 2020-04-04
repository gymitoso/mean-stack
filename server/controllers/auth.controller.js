const jwt = require('jsonwebtoken');

const config = require('../config/config');

const generateToken = (user) => {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
};

const login = (req, res) => {
  const { user } = req;
  const token = generateToken(req.user);

  return res.json({ user, token });
};

module.exports = {
  login,
};

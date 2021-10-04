const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const fs = require('fs');
const publicKey = fs.readFileSync('./keys/public.pem');

const checkRole = (role) => {
  try {
    return async (req, res, next) => {
      const token = req.headers['authorization'];
      if (!token)
        return res.status(401).json('Unauthorized request: no token provided');

      const decoded = jwt.verify(token, publicKey);
      const foundUser = await User.findById(decoded.id);

      if (foundUser && foundUser.role === role) next();
      else res.status(403).json('Access denied');
    };
  } catch (error) {
    console.error(error.message);
    res.status(401).json('Unauthorized request: invalid token');
  }
};

const isLoggedIn = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(401).json('Unauthorized request: no token provided');
  try {
    const decoded = jwt.verify(token, publicKey);
    req.userId = decoded.id;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json('User not found or invalid token');

    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json('Unauthorized request: invalid token');
  }
};

module.exports = {checkRole, isLoggedIn}
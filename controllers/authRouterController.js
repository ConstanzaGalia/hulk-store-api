const User = require('../models/UserSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./keys/private.pem');
const jwtOptions = {algorithm: 'RS256', expiresIn: '4h'}

const register = async (req, res) => {
  const userData = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(409).json('This email has already been registered');
    } 
    const salt = await bcryptjs.genSalt(10);
    const encryptedPass = await bcryptjs.hash(password, salt);
    const encryptedUsername = await bcryptjs.hash(username, salt);
    const user = new User({
      ...userData,
      password: encryptedPass,
      username: encryptedUsername
    });
    const newUser = await user.save();
    const payload ={id: newUser._id};
    const token = jwt.sign(payload, privateKey, jwtOptions);
    res.status(200).json({JWT: token, data: newUser});
  } catch (error) {
    console.error(error.message);
    res.status(400).json('There was an error creating the user');
  }
};

const login = async (req, res) => {
  try {
    const {email, password } = req.body;
    const findUser = await User.findOne({email});
    if (!findUser || findUser.verify === false) {
      return res.status(400).json('User not found');
    }
    const correctPass = await bcryptjs.compare(password, findUser.password);
    if (!correctPass) {
      return res.status(400).json('Incorrect password');
    }
    const payload = {id: findUser._id}
    const token = jwt.sign(payload, privateKey, jwtOptions);
    res.status(200).json({JWT: token, data: findUser});
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
}

module.exports = {register, login}
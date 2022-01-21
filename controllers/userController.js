const { ObjectId } = require("mongoose").Types;
const User = require("../models/UserSchema");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("There was an error get all users")
  }
}


const deleteUser = async (req, res) => {
  const todayDate = new Date();
  const deletedStatus = {
      deletedAt: todayDate,
  };
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json("Object Id not valid");
  }
  const deletedUser = await User.findOneAndUpdate({_id: userId}, deletedStatus, {new: true});
  if (deletedUser) {
      return res.status(200).json(deletedUser);
  } else {
      res.status(400).json("User not found");
  }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("There was an error deleted the user");
  }
}

const getOneUser = async (req, res) => {
  try {
      const userId = req.params.id;
      if (!ObjectId.isValid(userId)) {
          return res.status(400).json("Object Id not valid");
      }
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json("User not found");
      } else {
          res.status(200).json(user);
      }
  } catch (error) {
      console.log(error.message);
      res.status(500).json("There was an error search the user");
  }
};

const editUser = async (req, res) => {
  try {
      const { body } = req;
      const userId = req.params.id;
      if (!ObjectId.isValid(userId)) {
          return res.status(400).json("Object Id not valid");
      }
      const updateUser = await User.findOneAndUpdate(
          { _id: userId },
          body,
          { new: true }
      );
      if (updateUser) {
          res.status(200).json(updateUser);
      } else {
          res.status(400).json("User not found")
      }
  } catch (error) {
      console.log(error.message);
      return res.status(500).json('There was an error update the user');
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  editUser,
  getOneUser
}
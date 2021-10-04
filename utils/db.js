const mongoose = require('mongoose');

const conectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('DB Conected');
  } catch (error) {
    console.log(error);  
  }
}
module.exports = conectDB;
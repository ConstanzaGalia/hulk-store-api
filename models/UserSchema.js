const mongoose = require('mongoose');
const { Schema } = mongoose;

const userShema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  deletedAt: Date,
  role: { type: String, default: 'contact' }
},
  {
    timestamps: true,
    versionKey: false,
  })

module.exports = mongoose.model('user', userShema);
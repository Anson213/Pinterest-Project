const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageId : {
    type: String,
    required: false
  },
  imageUrl : {
    type: String,
    required: false
  },
  followers: [{
    type: Array,
    required: false
  }],
  following: [{
    type: Array,
    required: false
  }]
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);

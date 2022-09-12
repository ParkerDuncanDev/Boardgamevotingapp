const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    required: false
  },
  friendIds: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('profile', ProfileSchema)
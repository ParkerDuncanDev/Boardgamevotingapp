const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  gameNightId: {
    type: String,
    required: true
  },
  replyTo: {
    type: String,
  }
})

module.exports = mongoose.model('Comment', commentSchema)
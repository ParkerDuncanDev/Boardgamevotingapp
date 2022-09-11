const mongoose = require('mongoose')

const shelfSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  title: {
    type: Boolean,
    required: true,
  },
  games: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('shelf', shelfSchema)

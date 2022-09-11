const mongoose = require('mongoose')

const gameNightSchema = new mongoose.Schema({
    creatorId: {
      type: String,
      required: true
    },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  invitedIds: {
    type: Array,
    required: false
  },
  attendingIds: {
    type: Array,
    required: false
  },
  games: {
    type: Array,
    required: false
  },
  voteType: {
    type: String,
    required: true
  },
  voteByDate: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('gameNight', gameNightSchema)
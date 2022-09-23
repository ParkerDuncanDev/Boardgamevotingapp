const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, profileController.getProfileForOwner)

router.get('/:id', ensureAuth, profileController.getProfile)

 router.get('/friends', profileController.getFriends)

 router.put('/friends/add', profileController.addFriend)

//  router.delete('/friends/remove/:id', profileController.removeFriend)

// router.delete('/deleteTodo', shelfController.deleteTodo)

module.exports = router
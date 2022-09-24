const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, profileController.getProfileForOwner)

router.get('/friends', profileController.getFriends)

router.get('/:id', ensureAuth, profileController.getProfile)


 router.put('/friends/add', profileController.addFriend)

 router.put('/friends/accept', profileController.acceptFriend)

 router.put('/friends/decline', profileController.declineFriend)

//  router.delete('/friends/remove/:id', profileController.removeFriend)

// router.delete('/deleteTodo', shelfController.deleteTodo)

module.exports = router
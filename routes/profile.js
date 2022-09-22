const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, profileController.getProfileForOwner)

router.get('/:id', ensureAuth, profileController.getProfile)


// router.post('/createTodo', shelfController.createTodo)

// router.put('/markComplete', shelfController.markComplete)

// router.put('/markIncomplete', shelfController.markIncomplete)

// router.delete('/deleteTodo', shelfController.deleteTodo)

module.exports = router
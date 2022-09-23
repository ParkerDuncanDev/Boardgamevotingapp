const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comments') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')


 router.post('/createComment', commentController.createComment)

// router.put('/markComplete', shelfController.markComplete)

// router.put('/markIncomplete', shelfController.markIncomplete)

// router.delete('/deleteTodo', shelfController.deleteTodo)

module.exports = router
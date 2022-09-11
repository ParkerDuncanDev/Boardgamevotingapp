const express = require('express')
const router = express.Router()
const shelfController = require('../controllers/shelf') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, shelfController.getShelfs)

// router.post('/createTodo', shelfController.createTodo)

// router.put('/markComplete', shelfController.markComplete)

// router.put('/markIncomplete', shelfController.markIncomplete)

// router.delete('/deleteTodo', shelfController.deleteTodo)

module.exports = router
const express = require('express')
const router = express.Router()
const gameNightController = require('../controllers/gamenight') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, gameNightController.getGameNights)

router.post('/createGameNight', gameNightController.createGameNight)

router.put('/inviteUser', gameNightController.inviteUser)

router.put('/acceptInvite', gameNightController.acceptInvite)

router.put('/declineInvite', gameNightController.declineInvite)

router.delete('/deleteGameNight', gameNightController.deleteGameNight)

module.exports = router
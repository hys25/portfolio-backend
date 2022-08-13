const express = require('express')
const router = express.Router()
const { signUp, singIn } = require('../controllers/authController')

router.post('/sign-up', signUp)
router.post('/sing-in', singIn)

module.exports = router
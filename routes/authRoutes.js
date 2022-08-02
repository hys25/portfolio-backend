const express = require('express')
const router = express.Router()
const { registration, login, forgotPassword } = require('../controllers/authController')

router.post('/register', registration)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)

module.exports = router
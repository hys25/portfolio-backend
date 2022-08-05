const express = require('express')
const router = express.Router()
const { registration, login, forgotPassword, getMe } = require('../controllers/authController')

router.post('/register', registration)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.get('/me', getMe)

module.exports = router
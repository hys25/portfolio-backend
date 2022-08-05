const express = require('express')
const router = express.Router()
const { registration, login, forgotPassword, getMe } = require('../controllers/authController')
const { protect } = require('../middleware/protectAuthMiddleware')

router.post('/register', registration)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.get('/me', protect, getMe)

module.exports = router
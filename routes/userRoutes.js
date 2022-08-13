const express = require('express')
const router = express.Router()
const { forgotPassword, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/protectAuthMiddleware')

router.post('/forgot-password', forgotPassword)
router.get('/me', protect, getMe)

module.exports = router
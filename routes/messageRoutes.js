const express = require('express')
const router = express.Router()
const { getMessages, getMessage, setMessage, deleteMessage } = require('../controllers/messageController')

router.get('/', getMessages)
router.get('/:id', getMessage)
router.post('/', setMessage)
router.delete('/:id', deleteMessage)

module.exports = router
const asyncHandler = require('express-async-handler')
const MessageModel = require('../models/messageModel')

// GET  get all messages  /api/message
const getMessages = asyncHandler(async (req, res) => {
  const messages = await MessageModel.find()
  res.status(200).json(messages)
})

// GET  get message  /api/message/:id
const getMessage = asyncHandler(async (req, res) => {
  if(!req.params.id){
    res.status(400)
    throw new Error("Provide message's id")
  }
  const message = await MessageModel.findById(req.params.id)
  res.status(200).json(message)
})

// POST  add message  /api/message
const setMessage = asyncHandler(async (req, res) => {
  try {
    const message = await MessageModel.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      message: req.body.message,
    })
    res.status(200).json(message)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// DELETE  delete message  /api/message/:id
const deleteMessage = asyncHandler(async (req, res) => {
  try {
    const message = await MessageModel.findById(req.params.id)
    res.status(200).json(message)
    return await message.remove()
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = {
  getMessages,
  getMessage,
  setMessage,
  deleteMessage
}
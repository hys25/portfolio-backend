const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// POST  forgot password  /api/user/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  if(!req.body.email) {
    res.status(400)
    throw new Error("Please add an email address")
  }
  const user = await User.create({
    email: email,
  })
  res.status(200).json({user})
})

// GET  get user data  /api/user/me
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

module.exports = {
  forgotPassword,
  getMe
}
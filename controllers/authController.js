const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Auth = require('../models/authModel')

// POST  registration  /api/auth/register
const registration = asyncHandler(async (req, res) => {
  const {password, email, username} = req.body
  if(!email && !password && !username) {
    res.status(400)
    throw new Error("All fields are required")
  } else if (!password){
    res.status(400)
    throw new Error("Please add an password")
  } else if (!email) {
    res.status(400)
    throw new Error("Please add an email address")
  } else if (!username) {
    res.status(400)
    throw new Error("Please add your username")
  }

  //Check if user exists
  const userExist = await Auth.findOne({email})
  if(userExist){
    res.status(400)
    throw new Error("User already exists")
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  const user = await Auth.create({
    email,
    password: hashedPassword,
    username,
  })

  if(user){
    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }

  res.status(200).json({user})
})

// POST  sing in  /api/auth/login
const login = asyncHandler(async (req, res) => {
  const {password, email} = req.body
  if(!email && !password) {
    res.status(400)
    throw new Error("Please add an email address and password")
  } else if (!password){
    res.status(400)
    throw new Error("Please add an password")
  } else if (!email) {
    res.status(400)
    throw new Error("Please add an email address")
  }

   //Check for user
  const user = await Auth.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

// POST  forgot password  /api/auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  if(!req.body.email) {
    res.status(400)
    throw new Error("Please add an email address")
  }
  const user = await Auth.create({
    email: email,
  })
  res.status(200).json({user})
})

// GET  get user data  /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  const {_id, username, email} = await Auth.findById(req.user.id)
  res.status(200).json({
    id: _id,
    username,
    email
  })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registration,
  login,
  forgotPassword,
  getMe
}
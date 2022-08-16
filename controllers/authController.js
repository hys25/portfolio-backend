const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// POST  signUp  /api/auth/sign-up
const signUp = asyncHandler(async (req, res) => {
  const {password, email, username} = req.body
  if (!password){
    res.status(400)
    throw new Error("Please add an password")
  }
  if (!email) {
    res.status(400)
    throw new Error("Please add an email address")
  }
  if (!username) {
    res.status(400)
    throw new Error("Please add your username")
  }

  //Check if user exists
  const userExist = await User.findOne({email})
  if(userExist){
    res.status(400)
    throw new Error("User already exists")
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    email,
    password: hashedPassword,
    username,
  })

  if(!newUser){
    res.status(400)
    throw new Error("Invalid user data")
  }

  res.status(201).json({
    _id: newUser._id,
    email: newUser.email,
    username: newUser.username,
    token: generateToken(newUser._id)
  })
})

// POST  signIn  /api/auth/sign-in
const signIn = asyncHandler(async (req, res) => {
  const {password, email} = req.body
  if (!password){
    res.status(400)
    throw new Error("Please add a password")
  }
  if (!email) {
    res.status(400)
    throw new Error("Please add an email address")
  }

   //Check for user
  const user = await User.findOne({email})

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

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  signUp,
  signIn,
}
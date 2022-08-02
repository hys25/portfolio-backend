const asyncHandler = require('express-async-handler')

// POST     registration
const registration = asyncHandler(async (req, res) => {
    if(!req.body.email && !req.body.password && !req.body.username) {
    res.status(400)
    throw new Error("All fields are required")
  } else if (!req.body.password){
    res.status(400)
    throw new Error("Please add an password")
  } else if (!req.body.email) {
    res.status(400)
    throw new Error("Please add an email address")
  } else if (!req.body.username) {
    res.status(400)
    throw new Error("Please add your username")
  }
  res.status(200).send({
    "message": "REGISTRATION",
  })
})
// POST     sing in
const login = asyncHandler(async (req, res) => {
  if(!req.body.email && !req.body.password) {
    res.status(400)
    throw new Error("Please add an email address and password")
  } else if (!req.body.password){
    res.status(400)
    throw new Error("Please add an password")
  } else if (!req.body.email) {
    res.status(400)
    throw new Error("Please add an email address")
  }
  res.status(200).send({
    "message": "LOGIN",
  })
})

// POST     forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  if(!req.body.email) {
    res.status(400)
    throw new Error("Please add an email address")
  }
  res.status(200).send({
    "message": "forgotPassword",
  })
})

module.exports = {
  registration,
  login,
  forgotPassword
}
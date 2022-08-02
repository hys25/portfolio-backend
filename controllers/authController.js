// POST     registration
const registration = (req, res) => {
  console.log(req.body)
  res.send({"message": "register",})
}
// POST     sing in
const login = (req, res) => {
  console.log(req.body)
  res.send({
    "message": "LOGIN",
  })
}

// POST     forgot password
const forgotPassword = (req, res) => {
  console.log(req.body)
  res.send({
    "message": "forgotPassword",
  })
}

module.exports = {
  registration,
  login,
  forgotPassword
}
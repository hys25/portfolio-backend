const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: 'string',
    required: [true, 'Please add an email']
  },
  password: {
    type: 'string',
    required: [true, 'Please add password']
  },
  username: {
    type: 'string',
    required: [true, 'Please add username']
  },
},{
  timestamps: true,
})

module.exports = mongoose.model('User', userSchema)
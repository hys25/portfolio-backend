const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
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

module.exports = mongoose.model('Auth', authSchema)
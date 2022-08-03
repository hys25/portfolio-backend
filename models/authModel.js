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
},{
  timestamps: true,
})

module.exports = mongoose.model('Auth', authSchema)
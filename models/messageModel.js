const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  first_name: {
    type: 'string',
    required: [true, 'Please add your name']
  },
  last_name: {
    type: 'string'
  },
  email: {
    type: 'string',
    required: [true, 'Please add your email']
  },
  message: {
    type: 'string',
    required: [true, 'Please add your message']
  },
},{
  timestamps: true,
})

module.exports = mongoose.model('MessageModel', messageSchema)
const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
  text: {
    type: 'string',
    required: [true, 'Please add a text value (project)']
  },
},{
  timestamps: true,
})

module.exports = mongoose.model('Project', projectSchema)
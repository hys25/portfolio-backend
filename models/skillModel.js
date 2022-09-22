const mongoose = require('mongoose')

const skillSchema = mongoose.Schema({
  skill_name: {
    type: 'string',
    required: [true, 'Please add skill name']
  },
},{
  timestamps: true,
})

module.exports = mongoose.model('SkillModel', skillSchema)
const mongoose = require('mongoose')

const skillsSchema = mongoose.Schema({
  skill_name: {
    type: 'string',
    required: [true, 'Please add skill name']
  },
},{
  timestamps: true,
})

module.exports = mongoose.model('SkillsModel', skillsSchema)
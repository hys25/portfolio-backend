const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
  project_name: {
    type: 'string',
    required: [true, 'Please add project name']
  },
  website_link: {
    type: 'string',
    required: [true, 'Please add link to website']
  },
  project_stack: {
    type: 'string'
  },
  project_description: {
    type: 'string',
    required: [true, 'Please add project description']
  },
  your_impact: {
    type: 'string',
    required: [true, 'Please add description of your impact to the project']
  },
  brand_color: {
    type: 'string'
  },
  main_image: {
    type: 'string',
    required: [true, 'Please add main image of project']
  },
  main_image_url: {
    type: 'string',
  },
  background_image: {
    type: 'string'
  },
  background_image_url: {
    type: 'string'
  },
},{
  timestamps: true,
})

module.exports = mongoose.model('Project', projectSchema)
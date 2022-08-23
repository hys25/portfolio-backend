const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')

// GET  get all projects  /api/projects
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
  res.status(200).json(projects)
})

// GET  get project  /api/project
const getProject = asyncHandler(async (req, res) => {
  const {_id, username, email} = await Project.findById(req.user.id)
  res.status(200).json({
    id: _id,
    username,
    email
  })
})

// POST  add project  /api/project
const setProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.create({
      project_name: req.body.project_name,
      website_link: req.body.website_link,
      project_stack: req.body.project_stack,
      project_description:  req.body.project_description,
      your_impact: req.body.your_impact,
      brand_color: req.body.brand_color,
      main_image: req.files.main_image[0].filename,
      background_image: req.files.background_image[0].filename,
    })
    res.status(200).json(project)
  } catch (error) {
    throw new Error(error)
  }
})

// PUT  update project  /api/project/:id
const updateProject = asyncHandler(async (req, res) => {
  console.log('req', req)
  const project = await Project.findById(req.params.id)
  if(!project) {
    res.status(400)
    throw new Error("Project not found")
  }
  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.status(200).json(updatedProject)
})

// DELETE  delete project  /api/project/:id
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
  if(!project) {
    res.status(400)
    throw new Error("Project not found")
  }
  await project.remove()
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getProjects,
  getProject,
  setProject,
  updateProject,
  deleteProject
}
const fs = require('fs')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')

const unlinkAsync = promisify(fs.unlink)

// GET  get all projects  /api/projects
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
  res.status(200).json(projects)
})

// GET  get project  /api/project/:id
const getProject = asyncHandler(async (req, res) => {
  if(!req.params.id){
    res.status(400)
    throw new Error("Provide project's id")
  }
  const project = await Project.findById(req.params.id)
  res.status(200).json(project)
})

// POST  add project  /api/project
const setProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.create({
      project_name: req.body.project_name,
      main_project: req.body.main_project,
      website_link: req.body.website_link,
      project_stack: req.body.project_stack,
      project_description:  req.body.project_description,
      your_impact: req.body.your_impact,
      brand_color: req.body.brand_color,
      main_image: req.files.main_image[0].filename,
      main_image_url: req.files.main_image[0].path.replace('public/', ''),
      background_image: req.files.background_image[0].filename,
      background_image_url: req.files.background_image[0].path.replace('public/', ''),
    })
    res.status(200).json(project)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// PUT  update project  /api/project/:id
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if(!project) {
    res.status(400)
    throw new Error("Project not found")
  }

  let mainImage = project.main_image
  let mainImageUrl = project.main_image_url
  let backgroundImage = project.background_image
  let backgroundImageUrl = project.background_image_url

  if(req?.files?.main_image) {
    mainImage = req.files.main_image[0].filename
    mainImageUrl = req.files.main_image[0].path.replace('public/', '')
    try {
      await unlinkAsync(`public/${project.main_image_url}`)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  if(req?.files?.background_image) {
    backgroundImage = req.files.background_image[0].filename
    backgroundImageUrl = req.files.background_image[0].path.replace('public/', '')
    try {
      await unlinkAsync(`public/${project.background_image_url}`)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
      project_name: req.body.project_name,
      main_project: req.body.main_project,
      website_link: req.body.website_link,
      project_stack: req.body.project_stack,
      project_description:  req.body.project_description,
      your_impact: req.body.your_impact,
      brand_color: req.body.brand_color,
      main_image: mainImage,
      main_image_url: mainImageUrl,
      background_image: backgroundImage,
      background_image_url: backgroundImageUrl
    }, {
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
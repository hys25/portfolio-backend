const asyncHandler = require('express-async-handler')
const SkillsModel = require('../models/skillsModel')

// GET  get all skills  /api/skills
const getSkills = asyncHandler(async (req, res) => {
  const skills = await SkillsModel.find()
  res.status(200).json(skills)
})

// POST  add skill  /api/skills
const setSkill = asyncHandler(async (req, res) => {
  try {
    const skill = await SkillsModel.create({
      skill_name: req.body.skill_name,
    })
    res.status(200).json(skill)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// PUT  update skill  /api/skills/:id
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await SkillsModel.findById(req.params.id)
  if(!skill) {
    res.status(400)
    throw new Error("Skill is not found")
  }

  const updatedSkill = await SkillsModel.findByIdAndUpdate(req.params.id, {
      skill_name: req.body.skill_name,
    }, {
    new: true
  })
  res.status(200).json(updatedSkill)
})

// DELETE  delete skill  /api/skills/:id
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await SkillsModel.findById(req.params.id)
  if(!skill) {
    res.status(400)
    throw new Error("Skill is not found")
  }
  try {
    res.status(200).json(skill)
    return await skill.remove()
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = {
  getSkills,
  setSkill,
  updateSkill,
  deleteSkill
}
const asyncHandler = require('express-async-handler')
const SkillModel = require('../models/skillModel')

// GET  get all skills  /api/skill
const getSkills = asyncHandler(async (req, res) => {
  const skills = await SkillModel.find()
  res.status(200).json(skills)
})

// POST  add skill  /api/skill
const setSkill = asyncHandler(async (req, res) => {
  try {
    const skill = await SkillModel.create({
      skill_name: req.body.skill_name,
    })
    res.status(200).json(skill)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

// PUT  update skill  /api/skill/:id
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await SkillModel.findById(req.params.id)
  if(!skill) {
    res.status(400)
    throw new Error("Skill is not found")
  }

  const updatedSkill = await SkillModel.findByIdAndUpdate(req.params.id, {
      skill_name: req.body.skill_name,
    }, {
    new: true
  })
  try {
    res.status(200).json(updatedSkill)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// DELETE  delete skill  /api/skill/:id
const deleteSkill = asyncHandler(async (req, res) => {
  try {
    const skill = await SkillModel.findById(req.params.id)
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
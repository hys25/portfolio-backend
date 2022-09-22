const express = require('express')
const router = express.Router()
const { getSkills, setSkill, updateSkill, deleteSkill } = require('../controllers/skillController')

router.get('/', getSkills)
router.post('/', setSkill)
router.put('/:id', updateSkill)
router.delete('/:id', deleteSkill)

module.exports = router
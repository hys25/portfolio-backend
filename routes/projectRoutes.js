const express = require('express')
const router = express.Router()
const { getProjects, getProject, setProject, updateProject, deleteProject } = require('../controllers/projectController')
const { protect } = require('../middleware/protectAuthMiddleware')

router.get('/projects', getProjects)
router.get('/project', getProject)
router.post('/project', setProject)
router.put('/project', updateProject)
router.delete('/project', deleteProject)

module.exports = router
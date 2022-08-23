const express = require('express')
const router = express.Router()
const { getProjects, getProject, setProject, updateProject, deleteProject } = require('../controllers/projectController')
const { protect } = require('../middleware/protectAuthMiddleware')
const { upload } = require('../utils/uploadFile')

router.get('/projects', getProjects)
router.get('/project', getProject)
router.post('/project', upload.fields([{name: 'main_image'}, {name : 'background_image'}]), setProject)
router.put('/project/:id', updateProject)
router.delete('/project/:id', deleteProject)

module.exports = router
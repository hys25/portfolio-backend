const express = require('express')
const router = express.Router()
const { getProjects, getProject, setProject, updateProject, deleteProject } = require('../controllers/projectController')
const { upload } = require('../utils/uploadFile')

router.get('/', getProjects)
router.get('/:id?', getProject)
router.post('/', upload.fields([{name: 'main_image'}, {name : 'background_image'}]), setProject)
router.put('/:id',upload.fields([{name: 'main_image'}, {name : 'background_image'}]), updateProject)
router.delete('/:id', deleteProject)

module.exports = router
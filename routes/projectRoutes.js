const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');

router.get('/', ProjectController.getProjects);
router.post('/', ProjectController.createProject);
router.put('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
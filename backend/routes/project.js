import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addProject, getProjects, getProject, updateProject, deleteProject} from '../controllers/projectController.js'

const router = express.Router()

router.get('/', authMiddleware, getProjects)
router.post('/add', authMiddleware, addProject)
router.get('/:id', authMiddleware, getProject)
router.put('/:id', authMiddleware, updateProject)
router.delete('/:id', authMiddleware, deleteProject)






export default router
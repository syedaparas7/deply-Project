import express from 'express';
import { changePassword } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Change password route
router.put('/change-password', authMiddleware, changePassword);

export default router;
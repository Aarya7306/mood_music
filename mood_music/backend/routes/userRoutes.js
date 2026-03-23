import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';   
import { addToFavorites, getFavorites } from '../controllers/userController.js';

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.post('/favorites', addToFavorites);
router.get('/favorites', getFavorites);
router.get('/profile', getUserProfile);

export default router;
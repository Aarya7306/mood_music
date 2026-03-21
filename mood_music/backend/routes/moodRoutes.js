import express from 'express';
express.Router();
import { getMoodMusic } from '../controllers/moodController.js';
import authMiddleware from '../middleware/authMiddleware.js';


Router.post("/songs", authMiddleware, getMoodMusic);

export default Router;
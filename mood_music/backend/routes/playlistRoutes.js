import express from 'express';
import { getAllPlaylists, createPlaylist, getPlaylistById, updatePlaylist, deletePlaylist } from '../controllers/playlistController.js';
import authMiddleware from '../middleware/authMiddleware.js';   

const router = express.Router();
router.use(authMiddleware); // Apply authentication middleware to all routes in this router 
router.get('/', getAllPlaylists);
router.post('/', createPlaylist);
router.get('/:id', getPlaylistById);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);

export default router;
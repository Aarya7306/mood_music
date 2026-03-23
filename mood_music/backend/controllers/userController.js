import User from '../models/User.js';
import Authmiddleware from '../middleware/authMiddleware.js';

// Add a song to the user's favorites
const addToFavorites = async(req, res) => {

    try{
        const {title, artist, videoId, thumbnail} = req.body;

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message: 'User not found'});

        }

        // Avoid duplicates by videoid

        const exists = user.favorites.some(song => song.videoId === videoId);

        if(exists){

            return res.status(400).json({message: 'Song already in favorites'});

    }

        user.favorites.push({title, artist, videoId, thumbnail});
        await user.save();

        res.status(200).json({message: 'Song added to favorites', favorites: user.favorites});
}
catch(error){
    res.status(500).json({message: 'Server error', error: error.message});
}};

// Get the user's favorite songs

const getFavorites = async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('favorites');
        res.json(user.favorites);
    } catch(error){
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

export default {addToFavorites, getFavorites};
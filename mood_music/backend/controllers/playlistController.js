import user from '../models/User.js';
import Playlist from '../models/Playlist.js';
// Create a new playlist

const createPlaylist = async (req, res) => {
    try {
        const {name, description} = req.body;

        if (!name) {
        return res.status(400).json({ message: "Playlist name is required" });
        }

        const exists = await Playlist.findOne({
        userId: req.user.id,
        name
        });

        if (exists) {
        return res.status(400).json({ message: "Playlist already exists" });
        }
        const createPlaylist = new Playlist({
            userId: req.user.id,
            name,
            description,
            songs: [],
        });

        await createPlaylist.save();
        res.status(201).json({message: 'Playlist created', playlist: createPlaylist});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});

    }
};

// get user playlists
const getUserPlaylists= async (req,res)=>{
    try{
        const playlist = await Playlist.find({userId: req.user.id});
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

// get single laylist
const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById({
            _id: req.params.id,
            userId: req.user.id
        });    
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }};

    //add song to playlist

    const addSongToPlaylist = async (req, res) => {
        try {
            const {title, artist, videoId, thumbnail} = req.body;

            const playlist = await Playlist.findOne({
                _id: req.params.id,
                userId: req.user.id
            });
            if (!playlist) {
                return res.status(404).json({ message: "Playlist not found" });
            }

            const exists = playlist.songs.some(song => song.videoId === videoId);
            if (exists) {
                return res.status(400).json({ message: "Song already in playlist" });
            }
        playlist.songs.push({title, artist, videoId, thumbnail});
        await playlist.save();
        res.status(200).json({message: 'Song added to playlist', playlist});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }};

    //delete playlist
    const deletePlaylist = async (req, res) => {
        try {
            const playlist = await Playlist.findOneAndDelete({
                _id: req.params.id,
                userId: req.user.id
            });
            if (!playlist) {        
                return res.status(404).json({ message: "Playlist not found" });
            }   
            res.status(200).json({message: 'Playlist deleted'});
        } catch (error) {
            res.status(500).json({message: 'Server error', error: error.message});
        }};

export default {createPlaylist, getUserPlaylists, getPlaylistById, addSongToPlaylist, deletePlaylist};

import getIntensityQuery from '../utils/moodLogic.js';
import searchSongs from '../utils/searchSongs.js';

const getMoodSongs = async (req, res) => {
    try {
        const { mood , intensity } = req.query;
        if (!mood) {
            return res.status(400).json({ error: 'Mood parameter is required' });
        }

        //search songs based on mood and intensity
        const query = getIntensityQuery(mood, intensity);

        //search songs on youtube
        const songs = await searchSongs(query);


        if(req.user){
            const user = await User.findById(req.user.id);
                if(user){
                    user.searchHistory.push({mood, intensity, songs: songs.map(song => ({title: song.title, videoId: song.videoId}))});
                    await user.save();
                }
        }
        res.json({
            success: true,
            mood,
            intensity,
            songs
        });
    } catch (error) {       
        res.status(500).json({ error: 'An error occurred while fetching songs' });
    }
        };

export default { getMoodSongs };

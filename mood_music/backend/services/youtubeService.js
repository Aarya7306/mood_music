import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const searchSongs=async (query) => {
    try {
        const response = await axios.get(YOUTUBE_API_KEY, {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 10,
                key: YOUTUBE_API_KEY
            },
        });

        const items = response.data.items;

        const songs = items.map(item => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.default.url,
            videoId : item.id.videoId
        }));

        return songs;
    } catch (error) {
        console.error('Error searching songs on YouTube:', error);
        throw error;
    }};

export default {searchSongs};
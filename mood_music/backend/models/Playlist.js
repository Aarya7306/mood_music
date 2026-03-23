import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
    {
        title: String,
        artist: String,
        videoId: String,
        thumbnail: String,
    }
);

const playlistSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true},
    
    name: {
        type: String,
        required: true,
    },


    description:String,
    songs: [songSchema],

    createdAt: {
        type: Date,
        default: Date.now,
    },

},

    {
        timestamps: true
    }
);

export default mongoose.model('Playlist', playlistSchema);
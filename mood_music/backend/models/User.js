import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: true,
      select: false, 
    },

    favorites: [
      {
        title: { type: String, required: true },
        artist: { type: String },
        videoId: { type: String },
        thumbnail: { type: String },
      },
    ],

    moodHistory: [
      {
        mood: { type: String, required: true },
        intensity: {
          type: String,
          enum: ["slight", "medium", "high"],
        },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
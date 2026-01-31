import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  _id: {
    type: String, 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;

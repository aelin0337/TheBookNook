import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  _id: {
    type: String, // совпадает с JSON
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
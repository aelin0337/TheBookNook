import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genreId: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: String,
  coverImage: String,
  publishedYear: Number,
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Book", bookSchema);

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // так как в JSON _id уже строки
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genreId: {
      type: String, // ссылка на Genre._id
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    publishedYear: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // убираем __v
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
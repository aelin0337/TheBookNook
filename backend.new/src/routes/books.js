import express from "express";
import Book from "../models/Book.js";
import Genre from "../models/Genre.js";

const router = express.Router();

// GET все книги с жанром через populate
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate({ path: "genreId", select: "name" });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET книга по ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("genreId", "name");
    res.json(book);
  } catch (err) {
    res.status(404).json({ error: "Book not found" });
  }
});

// POST новая книга
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT обновление книги
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE книга
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// AGGREGATION: средний рейтинг по жанру
router.get("/average-rating/:genreId", async (req, res) => {
  try {
    const result = await Book.aggregate([
      { $match: { genreId: new mongoose.Types.ObjectId(req.params.genreId) } },
      { $group: { _id: "$genreId", avgRating: { $avg: "$rating" } } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

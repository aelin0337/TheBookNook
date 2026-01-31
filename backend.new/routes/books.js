import express from "express";
import Book from '../models/Book.js';
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";
import { getAllBooks, getBookById, importBooksFromJSON} from "../controllers/bookController.js";
import { createBook, updateBook, deleteBook } from "../controllers/bookController.js";

const router = express.Router();

router.get('/aggregate/price-desc', async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $project: {
          title: 1,
          author: 1,
          price: 1,
          stock: 1,
          genreId: 1
        }
      },
      { $sort: { price: -1 } }
    ]);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", authMiddleware, adminOnly, createBook);
router.put("/:id", authMiddleware, adminOnly, updateBook);
router.delete("/:id", authMiddleware, adminOnly, deleteBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/import", importBooksFromJSON);

export default router;
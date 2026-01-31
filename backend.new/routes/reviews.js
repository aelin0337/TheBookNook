import express from "express";
import {
  getAllReviews,
  getReviewById,
  getReviewsByBook,
  createReview,
  getTopRatedBooks,
  getMostActiveUsers,
  getBookRatingWithDetails,
  getTopRatedBooksWithDetails,
  getReviewsWithUsers,
  getFullReviewsByBook,
  getTopGenresByReviews
} from "../controllers/reviewController.js";
import { getBookRatingStats } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/top/books", getTopRatedBooks);
router.get("/top/users", getMostActiveUsers);
router.get("/book/:bookId/stats", getBookRatingStats);
router.get("/stats/book/:bookId/full", getBookRatingWithDetails);
router.get("/top/books/full", getTopRatedBooksWithDetails);
router.get("/with-users", getReviewsWithUsers);
router.get("/book/:bookId/full", getFullReviewsByBook);
router.get("/top/genres", getTopGenresByReviews);


router.get("/", getAllReviews);
router.get("/book/:bookId", getReviewsByBook);
router.get("/:id", getReviewById);
router.post("/", createReview);

export default router;
import Review from "../models/Review.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Error getting reviews",
      error: error.message,
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({
      message: "Error getting review",
      error: error.message,
    });
  }
};

export const getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Error getting reviews for the book",
      error: error.message,
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { _id, userId, bookId, rating, comment, createdAt } = req.body;

    const newReview = new Review({
      _id,
      userId,
      bookId,
      rating,
      comment,
      createdAt,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({
      message: "Error creating review",
      error: error.message,
    });
  }
};

export const getBookRatingStats = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const stats = await Review.aggregate([
      { $match: { bookId } },
      {
        $group: {
          _id: "$bookId",
          averageRating: { $avg: "$rating" },
          reviewsCount: { $sum: 1 },
        },
      },
    ]);

    res.json(
      stats[0] || {
        bookId,
        averageRating: 0,
        reviewsCount: 0,
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Error getting book rating stats",
      error: error.message,
    });
  }
};

export const getTopRatedBooks = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $group: {
          _id: "$bookId",
          averageRating: { $avg: "$rating" },
          reviewsCount: { $sum: 1 },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 5 },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error getting top rated books",
      error: error.message,
    });
  }
};

export const getMostActiveUsers = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $group: {
          _id: "$userId",
          reviewsCount: { $sum: 1 },
        },
      },
      { $sort: { reviewsCount: -1 } },
      { $limit: 5 },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error getting most active users",
      error: error.message,
    });
  }
};
export const getBookRatingWithDetails = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const result = await Review.aggregate([
      { $match: { bookId } },

      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },

      {
        $group: {
          _id: "$bookId",
          title: { $first: "$book.title" },
          author: { $first: "$book.author" },
          averageRating: { $avg: "$rating" },
          reviewsCount: { $sum: 1 },
        },
      },
    ]);

    res.json(result[0] || {});
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getTopRatedBooksWithDetails = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $group: {
          _id: "$bookId",
          averageRating: { $avg: "$rating" },
          reviewsCount: { $sum: 1 },
        },
      },

      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },

      {
        $project: {
          _id: 0,
          bookId: "$_id",
          title: "$book.title",
          author: "$book.author",
          averageRating: 1,
          reviewsCount: 1,
        },
      },

      { $sort: { averageRating: -1 } },
      { $limit: 5 },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error agregation", error: error.message });
  }
};
// Reviews with user names
export const getReviewsWithUsers = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $project: {
          _id: 1,
          rating: 1,
          comment: 1,
          createdAt: 1,
          userName: "$user.name",
          userEmail: "$user.email",
          bookId: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error agregation", error: error.message });
  }
};
// Book reviews + user + book
export const getFullReviewsByBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const result = await Review.aggregate([
      { $match: { bookId } },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },

      {
        $project: {
          rating: 1,
          comment: 1,
          createdAt: 1,
          userName: "$user.name",
          bookTitle: "$book.title",
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error agregation", error: error.message });
  }
};

export const getTopGenresByReviews = async (req, res) => {
  try {
    const result = await Review.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },

      {
        $lookup: {
          from: "genres",
          localField: "book.genreId",
          foreignField: "_id",
          as: "genre",
        },
      },
      { $unwind: "$genre" },

      {
        $group: {
          _id: "$genre.name",
          reviewsCount: { $sum: 1 },
          averageRating: { $avg: "$rating" },
        },
      },

      { $sort: { reviewsCount: -1 } },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error agregation", error: error.message });
  }
};

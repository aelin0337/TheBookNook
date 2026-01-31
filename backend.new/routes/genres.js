import express from "express";
import { getAllGenres, getGenreById, createGenre } from "../controllers/genreController.js";

const router = express.Router();

router.get("/", getAllGenres);
router.get("/:id", getGenreById);
router.post("/", createGenre);

export default router;

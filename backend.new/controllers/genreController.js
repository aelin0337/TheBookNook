import Genre from "../models/Genre.js";

export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: "Error getting genre", error: error.message });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ message: "Error getting genre", error: error.message });
  }
};

export const createGenre = async (req, res) => {
  try {
    const { _id, name, description } = req.body;
    const newGenre = new Genre({ _id, name, description });
    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ message: "Error creating genre", error: error.message });
  }
};

import Genre from "../models/Genre.js";

// Получить все жанры
export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении жанров", error: error.message });
  }
};

// Получить жанр по ID
export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ message: "Жанр не найден" });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении жанра", error: error.message });
  }
};

// Создать новый жанр
export const createGenre = async (req, res) => {
  try {
    const { _id, name, description } = req.body;
    const newGenre = new Genre({ _id, name, description });
    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании жанра", error: error.message });
  }
};

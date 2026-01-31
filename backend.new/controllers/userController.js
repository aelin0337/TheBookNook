// userController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ================== Регистрация ==================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // получаем обычный пароль

    // Проверка существующего email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email уже используется" });
    }

    const user = new User({
      name,
      email,
      passwordHash: password, // сохраняем пароль как текст для учебного проекта
      role: "user",
    });

    await user.save();

    res.status(201).json({ message: "Пользователь зарегистрирован", userId: user._id });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при регистрации пользователя",
      error: error.message,
    });
  }
};

// ================== Логин ==================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Проверка пароля напрямую
    if (user.passwordHash !== password) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при входе",
      error: error.message,
    });
  }
};

// ================== Обновление пользователя ==================
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    if (req.user.role !== "admin") delete req.body.role;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    ).select("-passwordHash");

    if (!updatedUser) return res.status(404).json({ message: "Пользователь не найден" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при обновлении пользователя",
      error: error.message,
    });
  }
};
// ================== Мой профиль ==================
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-passwordHash");
  res.json(user);
};


// ================== Удаление пользователя ==================
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) return res.status(404).json({ message: "Пользователь не найден" });

    res.json({ message: "Пользователь удалён" });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при удалении пользователя",
      error: error.message,
    });
  }
};

// ================== Получить всех пользователей ==================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении пользователей",
      error: error.message,
    });
  }
};

// ================== Получить пользователя по ID ==================
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении пользователя",
      error: error.message,
    });
  }
};

// ================== Создать пользователя (для админа) ==================
export const createUser = async (req, res) => {
  try {
    const { _id, name, email, password, role, createdAt } = req.body;

    const newUser = new User({
      _id,
      name,
      email,
      passwordHash: password, // текстовый пароль
      role,
      createdAt,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при создании пользователя",
      error: error.message,
    });
  }
};
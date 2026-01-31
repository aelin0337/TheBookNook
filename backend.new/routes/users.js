import express from "express";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  login,
  registerUser,
  updateUser,
  deleteUser,
  getMe
} from "../controllers/userController.js";

const router = express.Router();

// Регистрация нового пользователя
router.post("/register", registerUser);

// Логин
router.post("/login", login);

// Получить всех пользователей (только для админов)
router.get("/", authMiddleware, adminOnly, getAllUsers);
router.get("/me", authMiddleware, getMe);

// CRUD отдельного пользователя
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminOnly, deleteUser);

export default router;
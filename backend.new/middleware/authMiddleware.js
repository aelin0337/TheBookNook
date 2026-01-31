import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Нет токена" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    req.user = user; // <- очень важно!
    next();
  } catch (error) {
    res.status(401).json({ message: "Ошибка авторизации", error: error.message });
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Нет токена" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-passwordHash");


    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Только для админов" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Ошибка авторизации", error: error.message });
  }
};
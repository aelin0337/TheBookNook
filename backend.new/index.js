import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import booksRouter from "./routes/books.js";
import genresRouter from "./routes/genres.js";
import ordersRouter from "./routes/orders.js";
import reviewsRouter from "./routes/reviews.js";
import usersRouter from "./routes/users.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://127.0.0.1:5501', 'http://localhost:5501'],
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (req, res) => res.send("Server is running!"));
app.get("/api/db-status", (req, res) => {
  res.json({
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
  });
});
app.use('/api/genres', genresRouter);
app.use("/api/books", booksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
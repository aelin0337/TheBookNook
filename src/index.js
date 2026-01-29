import express from "express"; 
import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import cors from "cors"; 
import Book from "./models/Book.js"; 
import booksRouter from "./routes/books.js"; 
import usersRouter from "./routes/users.js"; 
import ordersRouter from "./routes/orders.js"; 
import reviewsRouter from "./routes/reviews.js"; 
import genresRouter from "./routes/genres.js"; 

app.use("/api/books", booksRouter); 
app.use("/api/users", usersRouter); 
app.use("/api/orders", ordersRouter); 
app.use("/api/reviews", reviewsRouter); 
app.use("/api/genres", genresRouter);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/genres", genresRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Bookstore API works");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

console.log("🚨 START");

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Book from '../models/Book.js';

dotenv.config();

console.log("📘 Book model loaded");

const importData = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const count = await Book.countDocuments();
    console.log(`📚 Books in DB: ${count}`);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

importData();

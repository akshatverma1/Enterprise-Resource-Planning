import express from "express";
import fs from "fs";
import cors from "cors";
import mongoose from "mongoose";
import Product from "../models/Products.js";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "https://www.akshatv.life"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.db_url);
  isConnected = true;
}

app.get("/", async (req, res) => {
  await connectDB();
  res.send("Home Route");
});

app.get("/api/products", async (req, res) => {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  await connectDB();
  const product = new Product(req.body);
  const saved = await product.save();
  res.status(201).json(saved);
});

app.put("/api/products/:id", async (req, res) => {
  await connectDB();
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  await connectDB();
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) return res.status(404).json({ success: false, message: "Not found" });
  res.status(200).json({ success: true, data: deletedProduct });
});

// Export as a Vercel serverless function
export default serverless(app);

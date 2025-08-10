import express from "express";
import fs from "fs";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import Product from "./models/Products.js";
import dotenv from "dotenv";

dotenv.config();

const data = JSON.parse(fs.readFileSync("./random_parts_data.json", "utf-8"));
const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "https://www.akshatv.life"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Cached DB connection for serverless
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

// Routes
app.get("/",async(req,res)=>{
  await connectDB();
  res.send("Home Route");
})
app.get("/api/products", async (req, res) => {
  await connectDB();
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  await connectDB();
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  await connectDB();
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  await connectDB();
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ❌ REMOVE app.listen()
// ✅ Export the app for Vercel
export default app;

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Products.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS setup
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

// ✅ MongoDB Connection (Reusable for serverless)
// let isConnected = false;
// async function connectDB() {
//   if (isConnected) return;
//   if (!process.env.db_url) {
//     throw new Error("❌ MongoDB connection string is missing in ENV (db_url)");
//   }
//   const db = await mongoose.connect(process.env.db_url);
//   isConnected = db.connections[0].readyState;
//   console.log("✅ MongoDB Connected");
// }

async function connectDB() {
  await mongoose.connect(process.env.db_url);
}
try {
  connectDB().then((result) => {
      console.log("MongoDB is Connected");
  })
} catch (error) {
  console.log(error);
}

// ✅ Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Akshat Verma API is running");
});

// app.listen(4000,()=>{
//   console.log("66")
// });
// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
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

// Delete product
app.delete("/api/products/:id", async (req, res) => {
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

// ✅ Export handler for Vercel
export default app;

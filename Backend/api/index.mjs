import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppleIcon } from "lucide-react";
// ✅ Connect to MongoDB Atlas
dotenv.config();
const MONGO_URI = process.env.db_url;
if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not set in environment variables");
}

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

// ✅ Define Mongoose schema and model in same file
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  brand: String,
  SKU: String,
  quantity: Number,
  minQuantity: Number,
  price: Number,
  costPrice: Number,
  supplier: String,
  location: String,
  partNumber: String,
  gst: String,
  coating: String,
  images: [String]
});

// Prevent OverwriteModelError on re-deploy
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

// ✅ Express App
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

//test Route
app.get("/",(req,res)=>{
  res.send("Routes is Working");
})

// Routes
app.get("/api/products", async (req, res) => {
  try {
    await connectDB();
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    await connectDB();
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.delete("/api/products/:id", async (req, res) => {
  try {
    await connectDB();
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Export for Vercel
export default app;

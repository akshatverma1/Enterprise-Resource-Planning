import express from "express"
import fs from "fs";
import cors from 'cors';
import mongoose from "mongoose";
const data = JSON.parse(fs.readFileSync("./random_parts_data.json", "utf-8"));
import axios from "axios";
import Product from"./models/Products.js";

const app = express();
const port = 4000;

app.use(express.json());
const allowedOrigins = ['http://localhost:5173', 'https://www.akshatv.life'];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

async function connectDB() {
  await mongoose.connect("mongodb+srv://ashirwad2512:akshat@erp.nsr0tg8.mongodb.net/?retryWrites=true&w=majority&appName=erp");
}
try {
  connectDB().then((result) => {
      console.log("MongoDB is Connected");
  })
} catch (error) {
  console.log(error);
}

//Server Start
app.listen(port, () => {
  console.log("Server is Running on port " + port);
});

//Get All Product
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log("Get all product");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//new product api
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    // console.log("New Product Added");
    res.status(201).json(saved);
    // res.redirect("https://www.akshatv.life");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Update the Product
app.put("/api/products/:id", async (req, res) => {
  try {
      const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      console.log("Product Updated");
      res.status(200).json(updatedProduct);
  } catch (error) {
      res.status(500).json({ message: "Update failed", error });
  }
});

// Delete Product
app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    console.log("Product Deleted:", deletedProduct._id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

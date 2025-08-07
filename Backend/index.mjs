import express from "express"
import fs from "fs";
import cors from 'cors';
import mongoose from "mongoose";
const data = JSON.parse(fs.readFileSync("./random_parts_data.json", "utf-8"));

import Product from"./models/Products.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

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
    console.log("New Product Added");
    // res.status(201).json(saved);
    res.redirect("https://www.akshatv.life");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Update the Product
app.patch("/updateProduct/:id", async (req, res) => {
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

//Delete Product
app.get("/deleteProduct/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    console.log("Product Deleted");
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    
    // ✅ Proper JSON response instead of redirect
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
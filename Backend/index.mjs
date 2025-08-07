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
app.get("/data",(req,res)=>{
    console.log("API REQUEST");
    res.json(data);
})


//new product api
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    // res.status(201).json(saved);
    res.redirect("https://www.akshatv.life");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });
    // res.json(updated);
    res.redirect("https://www.akshatv.life");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.redirect("https://www.akshat.life");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
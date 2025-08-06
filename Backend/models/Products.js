import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    company: String,
    supplier: String,
    location: Number,
    partNumber:String,
    price: Number,
    stock: Number,
    image: String,
    designImage :String,
    designDXF :String,
    gst:String,
    coating:String
  }, { timestamps: true });

module.exports = mongoose.model("Products",productSchema);
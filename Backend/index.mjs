import express from "express"
import fs from "fs";
import cors from 'cors';
import mongoose from "mongoose";
const data = JSON.parse(fs.readFileSync("./random_parts_data.json", "utf-8"));


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

app.listen(port, () => {
  console.log("Server is Running on port " + port);
});
app.get("/data",(req,res)=>{
    console.log("API REQUEST");
    res.json(data);
})
app.post("/newProduct",(req,res)=>{
  console.log("New Product");
})
app.delete("/deteteProduct",(req,res)=>{
  console.log("Delete");
})
app.patch("/updateProduct",(req,res)=>{
  console.log("Update the Product");
})
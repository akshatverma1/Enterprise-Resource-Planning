import express from "express"
import fs from "fs";
const data = JSON.parse(fs.readFileSync("./random_parts_data.json", "utf-8"));
// import data from "./random_parts_data.json" assert { type: "json" };
const app = express();
const port = 4000;

app.listen(port, () => {
  console.log("Server is Running on port " + port);
});

for (const f of data) {
  console.log(f.partname);
}

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

// ✅ MongoDB connection
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://ashirwad:242424@cluster0.fzstsnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not set in environment variables");
}

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

// ✅ Product schema & model
const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    company: String,
    supplier: String,
    location: Number,
    partNumber: String,
    price: Number,
    stock: Number,
    image: String,
    designImage: String,
    designDXF: String,
    gst: String,
    coating: String,
  },
  { timestamps: true }
);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

// ✅ Employee schema & model
const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: {
      type: String,
      required: true,
      enum: [
        "Management",
        "Finance",
        "IT",
        "HR",
        "Sales",
        "Marketing",
        "Operations",
      ],
    },
    position: { type: String, required: true },
    salary: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },
    reportsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
  },
  { timestamps: true }
);
const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

// ✅ Express App
const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// ---------- ROUTES ----------

// Test Route
app.get("/", (req, res) => {
  res.send("Ashriwad Enterprises API is Working");
});

// ---------- PRODUCT ROUTES ----------
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

app.put("/api/products/:id", async (req, res) => {
  try {
    await connectDB();
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
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

// ---------- EMPLOYEE ROUTES ----------
app.get("/api/employees", async (req, res) => {
  try {
    await connectDB();
    const { department, status, search } = req.query;
    let filter = {};

    if (department && department !== "All") filter.department = department;
    if (status && status !== "All") filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ];
    }

    const employees = await Employee.find(filter).populate(
      "reportsTo",
      "name position"
    );
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  try {
    await connectDB();
    const employee = await Employee.findById(req.params.id).populate(
      "reportsTo",
      "name position"
    );
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    await connectDB();
    const existingEmployee = await Employee.findOne({ email: req.body.email });
    if (existingEmployee)
      return res
        .status(400)
        .json({ error: "Employee with this email already exists" });

    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    await newEmployee.populate("reportsTo", "name position");
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    await connectDB();
    if (req.body.email) {
      const existingEmployee = await Employee.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
      });
      if (existingEmployee)
        return res
          .status(400)
          .json({ error: "Employee with this email already exists" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("reportsTo", "name position");

    if (!updatedEmployee)
      return res.status(404).json({ error: "Employee not found" });

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    await connectDB();
    await Employee.updateMany(
      { reportsTo: req.params.id },
      { $set: { reportsTo: null } }
    );
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee)
      return res.status(404).json({ error: "Employee not found" });

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/employees/hierarchy/tree", async (req, res) => {
  try {
    await connectDB();
    const employees = await Employee.find().populate("reportsTo", "name position");

    const buildHierarchy = (parentId = null) => {
      return employees
        .filter((e) =>
          parentId === null ? !e.reportsTo : e.reportsTo?._id.toString() === parentId
        )
        .map((e) => ({
          ...e.toObject(),
          subordinates: buildHierarchy(e._id.toString()),
        }));
    };

    res.json(buildHierarchy());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/employees/export/csv", async (req, res) => {
  try {
    await connectDB();
    const employees = await Employee.find().populate("reportsTo", "name");

    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Department",
      "Position",
      "Salary",
      "Joining Date",
      "Address",
      "Status",
      "Reports To",
    ].join(",");

    const csvContent = [
      headers,
      ...employees.map((e) =>
        [
          e._id,
          `"${e.name}"`,
          e.email,
          e.phone,
          e.department,
          `"${e.position}"`,
          e.salary,
          e.joiningDate.toISOString().split("T")[0],
          `"${e.address}"`,
          e.status,
          e.reportsTo ? `"${e.reportsTo.name}"` : "None",
        ].join(",")
      ),
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ashirwad_employees.csv"
    );
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/employees/stats/departments", async (req, res) => {
  try {
    await connectDB();
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
          averageSalary: {
            $avg: { $toDouble: { $substr: ["$salary", 1, -1] } },
          },
        },
      },
      {
        $project: {
          department: "$_id",
          count: 1,
          averageSalary: { $round: ["$averageSalary", 2] },
          _id: 0,
        },
      },
      { $sort: { department: 1 } },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/employees/department/:department", async (req, res) => {
  try {
    await connectDB();
    const employees = await Employee.find({
      department: req.params.department,
    }).populate("reportsTo", "name position");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- START SERVER LOCALLY ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Export app (for Vercel or testing)
export default app;

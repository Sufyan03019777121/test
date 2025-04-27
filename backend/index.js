const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // dotenv for environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Use cors and json middleware
app.use(cors());
app.use(express.json());

// Serve static files from 'uploads' folder
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Multer configuration (for image uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = 'uploads/';

    // Check if uploads directory exists, create if it doesn't
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for file size
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

// Product Model
const Product = mongoose.model('Product', productSchema);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Get all products from MongoDB
app.get("/api/products", async (req, res) => {
  try {
    const mongoProducts = await Product.find();
    res.json(mongoProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new product (MongoDB based)
app.post("/api/products", upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : ''; // If image is provided

    const newProduct = new Product({
      name,
      description,
      price,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error uploading product", error: error.message });
  }
});

// Get a product by ID (MongoDB)
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product (MongoDB)
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Update product (MongoDB)
app.put("/api/products/:id", upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : ''; // New image path if exists

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true } // To return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

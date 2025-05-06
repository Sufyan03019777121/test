const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (Updated - No Warnings)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Product Schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String], // ✅ Updated to accept an array of image URLs
});

const Product = mongoose.model('Product', productSchema);

// ✅ Routes

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

// Add new product
app.post('/add-product', async (req, res) => {
  try {
    const { title, description, price, images } = req.body; // ✅ Updated to handle images array
    const newProduct = new Product({ title, description, price, images });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// Edit product
app.put('/edit-product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, images } = req.body; // ✅ Updated to handle images array
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, price, images },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete product
app.delete('/delete-product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection (Updated: removed useUnifiedTopology)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer configuration for local file uploads (used before uploading to Cloudinary)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Mongoose Product model
const Product = mongoose.model('Product', {
  title: String,
  description: String,
  price: Number,
  image: String,
});

// POST: Add Product API
app.post('/add-product', upload.single('image'), async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);
    const newProduct = new Product({
      title,
      description,
      price,
      image: uploadedImage.secure_url, // secure_url is recommended
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: "Product not added", error });
  }
});

// GET: Get All Products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch products", error });
  }
});



// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

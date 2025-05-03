require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS middleware
app.use(cors({
  origin: 'https://test-admin-hvx3.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Multer config (local temp storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ✅ Mongoose model
const Product = mongoose.model('Product', {
  title: String,
  description: String,
  price: Number,
  image: String,
});

// ✅ POST: Add Product
app.post('/add-product', upload.single('image'), async (req, res) => {
  const { title, description, price } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ No image file uploaded" });
    }

    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    const newProduct = new Product({
      title,
      description,
      price,
      image: uploadedImage.secure_url,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ message: "Product not added", error: error.message });
  }
});

// ✅ GET: All Products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch products", error: error.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

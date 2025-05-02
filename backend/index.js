const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Product Schema
const Product = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
}));

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'nursery_products',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage });

// ✅ Upload Image Route
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'کوئی تصویر اپلوڈ نہیں ہوئی' });
  }
  res.json({ imageUrl: req.file.path });
});

// ✅ Save Product Route
app.post('/api/products', async (req, res) => {
  const { name, description, price } = req.body;
  
  if (!name || !description || !price) {
    return res.status(400).json({ error: 'تمام فیلڈز پر کرنا ضروری ہیں' });
  }

  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'پروڈکٹ محفوظ نہیں ہوئی' });
  }
});

// ✅ Get All Products (Latest First)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'پروڈکٹس لوڈ نہیں ہو سکیں' });
  }
});

// ✅ Get Product By ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "پروڈکٹ نہیں ملی" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete Product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "پروڈکٹ نہیں ملی" });

    // Delete Cloudinary Image
    if (product.imageUrl) {
      const publicId = product.imageUrl.split('/').pop().split('.')[0]; // Extract public_id
      await cloudinary.uploader.destroy(publicId);
    }

    res.json({ message: "پروڈکٹ کامیابی سے حذف ہو گئی" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update Product
app.put("/api/products/:id", upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "پروڈکٹ نہیں ملی" });

    if (req.file) {
      // If new image is uploaded, delete old image from Cloudinary
      if (product.imageUrl) {
        const publicId = product.imageUrl.split('/').pop().split('.')[0]; // Extract public_id
        await cloudinary.uploader.destroy(publicId);
      }
      product.imageUrl = req.file.path; // New image URL
    }

    product.name = name;
    product.description = description;
    product.price = price;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "پروڈکٹ اپ ڈیٹ نہیں ہوئی" });
  }
});

// ✅ 404 Handler (Optional)
app.use((req, res) => {
  res.status(404).json({ error: 'راستہ نہیں ملا' });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server چل رہا اے PORT ${PORT} تے`));

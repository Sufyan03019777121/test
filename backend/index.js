const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env

// Middleware
app.use(express.json());
app.use(cors());

// Dummy Products
let products = [
  { id: 1, title: 'Plant A', description: 'A nice plant', price: 100, image: 'imageA.jpg' },
  { id: 2, title: 'Plant B', description: 'Another nice plant', price: 150, image: 'imageB.jpg' },
];

// Routes
app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/add-product', (req, res) => {
  const { title, description, price, image } = req.body;
  const newProduct = { id: products.length + 1, title, description, price, image };
  products.push(newProduct);
  res.json(newProduct);
});

app.put('/edit-product/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, price, image } = req.body;
  let product = products.find(p => p.id == id);
  if (product) {
    product = { ...product, title, description, price, image };
    products = products.map(p => (p.id == id ? product : p));
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/delete-product/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id != id);
  res.status(200).json({ message: 'Product deleted' });
});

app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});

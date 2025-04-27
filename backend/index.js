
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // <- Added dotenv
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let products = []; // memory mein rakhenge

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Add new product
app.post("/api/products", (req, res) => {
  const { id, name, price } = req.body;
  products.push({ id, name, price });
  res.json({ message: "Product added" });
});

// Delete a product
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  products = products.filter(product => product.id !== id);
  res.json({ message: "Product deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





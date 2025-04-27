import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  const addProduct = () => {
    const newProduct = { id: Date.now().toString(), name, price };
    axios.post("http://localhost:5000/api/products", newProduct)
      .then(() => {
        fetchProducts();
        setName("");
        setPrice("");
      });
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => fetchProducts());
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Page</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="text"
        placeholder="Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={addProduct}>Add Product</button>

      <div style={{ marginTop: 30 }}>
        <h2>All Products</h2>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

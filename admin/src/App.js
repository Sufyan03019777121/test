import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', image: '' });
  const [editProduct, setEditProduct] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/products');
    setProducts(res.data);
  };

  // Add new product
  const addProduct = async () => {
    await axios.post('http://localhost:5000/add-product', newProduct);
    fetchProducts(); // Reload products list
    setNewProduct({ title: '', description: '', price: '', image: '' }); // Reset form
  };

  // Edit product
  const updateProduct = async () => {
    await axios.put(`http://localhost:5000/edit-product/${editProduct.id}`, editProduct);
    fetchProducts();
    setEditProduct(null); // Reset edit state
  };

  // Delete product
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/delete-product/${id}`);
    fetchProducts(); // Reload products list
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Add New Product Form */}
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Title"
        value={newProduct.title}
        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image"
        value={newProduct.image}
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
      />
      <button onClick={addProduct}>Add Product</button>

      {/* Edit Product Form */}
      {editProduct && (
        <div>
          <h2>Edit Product</h2>
          <input
            type="text"
            value={editProduct.title}
            onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
          />
          <input
            type="text"
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
          />
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
          />
          <input
            type="text"
            value={editProduct.image}
            onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
          />
          <button onClick={updateProduct}>Update Product</button>
        </div>
      )}

      {/* Display Products */}
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <img src={product.image} alt={product.title} style={{ width: '100px' }} />
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
          <button onClick={() => setEditProduct(product)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;

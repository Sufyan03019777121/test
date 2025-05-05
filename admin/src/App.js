import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', image: '' });
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all products
  const fetchProducts = async () => {
    const res = await axios.get('https://demo-backend-ti0w.onrender.com/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const addProduct = async () => {
    await axios.post('https://demo-backend-ti0w.onrender.com/add-product', newProduct);
    fetchProducts();
    setNewProduct({ title: '', description: '', price: '', image: '' });
  };

  // Update existing product
  const updateProduct = async () => {
    await axios.put(`https://demo-backend-ti0w.onrender.com/edit-product/${editProduct._id}`, editProduct);
    fetchProducts();
    setEditProduct(null);
  };

  // Delete product
  const deleteProduct = async (id) => {
    // Backend se product delete karna
    await axios.delete(`https://demo-backend-ti0w.onrender.com/delete-product/${id}`);
    
    // Frontend se turant product remove karna (Optimistic UI update)
    setProducts(products.filter(p => p._id !== id));
  };


  // Filtered products based on search
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">🌿 DarzNursery Admin Panel</h3>

      {/* Add New Product Form */}
      <div className="card p-3 mb-4">
        <h5>Add Product <FaPlus /></h5>
        <div className="row g-2">
          <div className="col-md">
            <input className="form-control" type="text" placeholder="Title" value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
          </div>
          <div className="col-md">
            <input className="form-control" type="text" placeholder="Description" value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          </div>
          <div className="col-md">
            <input className="form-control" type="number" placeholder="Price" value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          </div>
          <div className="col-md">
            <input className="form-control" type="text" placeholder="Image URL" value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
          </div>
          <div className="col-md-auto">
            <button className="btn btn-success w-100" onClick={addProduct}>Add</button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Search by name..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <span className="input-group-text">Total: {filteredProducts.length}</span>
      </div>

      {/* Edit Form */}
      {editProduct && (
        <div className="card p-3 mb-4 bg-light">
          <h5>Edit Product</h5>
          <div className="row g-2">
            <div className="col-md">
              <input className="form-control" type="text" value={editProduct.title}
                onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })} />
            </div>
            <div className="col-md">
              <input className="form-control" type="text" value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
            </div>
            <div className="col-md">
              <input className="form-control" type="number" value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
            </div>
            <div className="col-md">
              <input className="form-control" type="text" value={editProduct.image}
                onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })} />
            </div>
            <div className="col-md-auto">
              <button className="btn btn-primary w-100" onClick={updateProduct}>Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 g-3">
        {filteredProducts.map((product) => (
          <div className="col" key={product._id}>
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.title} style={{ height: 'auto', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-truncate">{product.description}</p>
                <p className="card-text"><strong>Rs:</strong> {product.price}</p>
                
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product._id)}><FaTrash /></button>
                <button className="btn btn-sm btn-warning" onClick={() => setEditProduct(product)}><FaEdit /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

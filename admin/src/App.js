import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    images: [
      '',
      '',
      '',
      '',
    ],
  });
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const fetchProducts = async () => {
    const res = await axios.get('https://demo-backend-ti0w.onrender.com/products');
    setProducts(res.data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const addProduct = async () => {
    await axios.post('https://demo-backend-ti0w.onrender.com/add-product', newProduct);
    fetchProducts();
    setNewProduct({
      title: '',
      description: '',
      price: '',
      images: [
        '',
        '',
        '',
        '',
      ],
    });
  };

  const updateProduct = async () => {
    await axios.put(
      `https://demo-backend-ti0w.onrender.com/edit-product/${editProduct._id}`,
      editProduct
    );
    fetchProducts();
    setEditProduct(null);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`https://demo-backend-ti0w.onrender.com/delete-product/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePasswordCheck = () => {
    if (passwordInput === '..821NS821..') {
      setIsAuthenticated(true);
    } else {
      alert('❌ Incorrect Password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
          <h4 className="text-center mb-3">🔒 Admin Access</h4>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Enter Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handlePasswordCheck}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">🌿 NS_Nursery Sevices Admin Panel</h3>

      {/* Add Product Form */}
      <div className="card p-3 mb-4">
        <h5>Add Product <FaPlus /></h5>
        <div className="row g-2">
          <div className="col-md">
            <input
              className="form-control"
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
          </div>
          <div className="col-md">
            <input
              className="form-control"
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </div>
          <div className="col-md">
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </div>
          <div className="col-md">
            {newProduct.images.map((img, index) => (
              <input
                key={index}
                className="form-control mb-2"
                type="text"
                placeholder={`Image URL ${index + 1}`}
                value={img}
                onChange={(e) => {
                  const updatedImages = [...newProduct.images];
                  updatedImages[index] = e.target.value || 'https://via.placeholder.com/150';
                  setNewProduct({ ...newProduct, images: updatedImages });
                }}
              />
            ))}
          </div>
          <div className="col-md-auto">
            <button className="btn btn-success w-100" onClick={addProduct}>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="input-group-text">Total: {filteredProducts.length}</span>
      </div>

      {/* Edit Form */}
      {editProduct && (
        <div className="card p-3 mb-4 bg-light">
          <h5>Edit Product</h5>
          <div className="row g-2">
            <div className="col-md">
              <input
                className="form-control"
                type="text"
                value={editProduct.title}
                onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
              />
            </div>
            <div className="col-md">
              <input
                className="form-control"
                type="text"
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              />
            </div>
            <div className="col-md">
              <input
                className="form-control"
                type="number"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              />
            </div>
            <div className="col-md">
              {editProduct.images?.map((img, index) => (
                <input
                  key={index}
                  className="form-control mb-2"
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  value={img}
                  onChange={(e) => {
                    const updatedImages = [...editProduct.images];
                    updatedImages[index] = e.target.value || 'https://via.placeholder.com/150';
                    setEditProduct({ ...editProduct, images: updatedImages });
                  }}
                />
              ))}
            </div>
            <div className="col-md-auto">
              <button className="btn btn-primary w-100" onClick={updateProduct}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {filteredProducts.map((product) => (
          <div className="col" key={product._id}>
            <div className="card h-100">
              <div className="d-flex flex-wrap justify-content-center p-2">
                {product.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img || 'https://via.placeholder.com/150'}
                    alt={`product-${i}`}
                    className="m-1 border"
                    style={{ width: '45%', height: '100px', objectFit: 'cover' }}
                  />
                ))}
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-truncate">{product.description}</p>
                <p className="card-text"><strong>Rs:</strong> {product.price}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product._id)}>
                  <FaTrash />
                </button>
                <button className="btn btn-sm btn-warning" onClick={() => setEditProduct(product)}>
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

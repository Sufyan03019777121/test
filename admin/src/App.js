import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Admin = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', product.image);

    try {
      await axios.post('https://test-backend-qpjr.onrender.com/add-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Product added successfully');
      setProduct({ title: '', description: '', price: '', image: null });
    } catch (error) {
      console.log(error);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={product.title}
              onChange={handleInputChange}
              placeholder="Enter product title"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={product.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter product description"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;

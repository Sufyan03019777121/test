import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BACKEND_URL = 'https://test-backend-0voz.onrender.com';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products`);
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);

    try {
      if (editMode) {
        await axios.put(`${BACKEND_URL}/api/products/${editProductId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product updated successfully!');
      } else {
        await axios.post(`${BACKEND_URL}/api/products`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product uploaded successfully!');
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to upload/update product');
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage(null);
    if (previewImage) URL.revokeObjectURL(previewImage);
    setPreviewImage(null);
    setEditMode(false);
    setEditProductId(null);
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditProductId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setPreviewImage(`${BACKEND_URL}/${product.image}`);
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/products/${id}`);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="py-5 text-white text-center rounded" style={{ background: 'linear-gradient(135deg, #4CAF50, #8BC34A)' }}>
        <h1 className="display-4 fw-bold">Daraz Nursery Admin Panel</h1>
        <p className="lead">Manage your plants with ease and beauty!</p>
      </div>

      <h2 className="text-center mt-4">{editMode ? 'Edit Product' : 'Add New Plant'}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
          {previewImage && <img src={previewImage} alt="Preview" className="mt-2" width="100" />}
        </div>
        <button type="submit" className="btn btn-primary">{editMode ? 'Update Product' : 'Upload Product'}</button>
      </form>

      <h3 className="text-center mt-5">Products List</h3>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <h5 className="text-center">Total Products: {filteredProducts.length}</h5>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description.length > 20 ? product.description.substring(0, 20) + '...' : product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <img src={`${BACKEND_URL}/${product.image}`} alt={product.name} width="50" />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(product)} className="btn btn-warning btn-sm me-2">Edit</button>
                      <button onClick={() => handleDelete(product._id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default App;

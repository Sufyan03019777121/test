import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceValue = parseFloat(price);

    if (isNaN(priceValue)) {
      alert("Please enter a valid price.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', priceValue);

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/products/${editProductId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Product updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Product uploaded successfully!');
      }

      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setEditMode(false);
      setEditProductId(null);
      fetchProducts();
    } catch (err) {
      console.error('Error uploading product:', err);
      alert('Failed to upload or update product');
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditProductId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImage(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{editMode ? 'Edit Product' : 'Add New Plant'}</h2>

      {/* Form to add/edit a product */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editMode ? 'Update Product' : 'Upload Product'}
        </button>
      </form>

      <h3 className="text-center mt-5">Products List</h3>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Total Products */}
      <h4 className="text-center mt-3">
        Total Products: {filteredProducts.length}
      </h4>

      <table className="table mt-4">
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
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  {product.image && (
                    <img
                      src={`http://localhost:5000/${product.image}`}
                      alt={product.name}
                      width="50"
                    />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn btn-warning me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;

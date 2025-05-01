// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Details from "./pages/Details";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/product/:id" element={<Details />} /> {/* درست روٹ */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Upload image to Cloudinary
      const imgData = new FormData();
      imgData.append('image', formData.image);

      const uploadRes = await axios.post('http://localhost:5000/api/upload', imgData);
      const imageUrl = uploadRes.data.imageUrl;

      // Step 2: Save product to MongoDB
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        imageUrl: imageUrl,
      };

      const productRes = await axios.post('http://localhost:5000/api/products', productData);

      onProductAdded(productRes.data); // Pass to parent
      setFormData({ name: '', description: '', price: '', image: null });
      setImagePreview(null);
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input type="file" onChange={handleImageChange} accept="image/*" required />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
        />
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;

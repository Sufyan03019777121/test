import React, { useState } from "react";
import axios from "axios";

function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);

    try {
      const res = await axios.post("http://localhost:5000/api/products", data);
      alert("✅ Product Uploaded Successfully");
      setFormData({ title: "", description: "", price: "", image: null });
    } catch (err) {
      alert("❌ Error Uploading Product");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel - Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            name="description"
            placeholder="Description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default Admin;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from 'react-bootstrap';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css"; // 👈 Custom CSS file for animations and styles

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://test-backend-0voz.onrender.com/api/products")  // Updated backend URL
      .then(res => {
        setProducts(res.data);
        setLoading(false); // Data loaded, set loading to false
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // If error, still set loading to false
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-5">

      {/* Welcome Banner */}
      <div className="text-center welcome-banner">
        <h1 className="fw-bold">Welcome to Daraz Nursery Shop</h1>
        <img
          src="https://i0.wp.com/plant.pk/wp-content/uploads/2020/02/royal-palm4.jpg?fit=1200%2C1200&ssl=1"
          alt="Young Date Palm Plant"
          className="animated-plant"
        />
        <div className="mt-3">
          <Button
            as={Link}
            to="https://wa.me/923094282079?text=%21%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%DB%8C%DA%A9%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%DB%83%20%D8%A7%D9%84%D9%84%DB%81"
            variant="success mx-2"
          >
            WhatsApp
          </Button>
          <Button as={Link} to="tel:923094282079" variant="primary mx-2">
            Call
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a plant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span className="ms-3">Loading...</span>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card h-100 shadow-sm">
                  {product.image && (
                    <img
                      src={`https://test-backend-0voz.onrender.com/${product.image}`}  // Updated image URL
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p
                      className="card-text text-truncate"
                      style={{ maxHeight: "40px" }}
                      title={product.description} // Tooltip for description
                    >
                      {product.description}
                    </p>
                    <p className="card-text fw-bold">Price: Rs. {product.price}</p>
                    <button
                      className="btn detail-btn mt-auto"
                      onClick={() => handleViewDetails(product._id)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="text-center">No plants found</h4>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;

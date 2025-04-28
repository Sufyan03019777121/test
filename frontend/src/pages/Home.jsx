import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://test-backend-t3bb.onrender.com/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
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
      <div className="text-center mb-5">
        <div
          className="text-center p-4 mb-5"
          style={{
            backgroundColor: "#d4edda", // Light green background
            borderRadius: "10px",
            animation: "fadeSlide 2s ease-in-out infinite"
          }}
        >
          <h1 className="fw-bold">Welcome to Daraz Nursery Shop</h1>
        </div>

        {/* 👇 Animation ka CSS */}
        <style>{`
  @keyframes fadeSlide {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`}</style>


         {/* whatsapp button */}
         <Button as={Link} to={`https://wa.me/923094282079?text=Hello%2C%20I%20am%20interested%20in%20buying%20the%20Aloe%20Vera%20plant.%20Can%20you%20give%20me%20more%20details%3F"`} variant="success mx-2 mt-3">whatsapp</Button>

         

        {/* Khajoor Plant Animation */}
        <img
          src="https://i0.wp.com/plant.pk/wp-content/uploads/2020/02/royal-palm4.jpg?fit=1200%2C1200&ssl=1"
          alt="Young Date Palm Plant"
          style={{
            width: "120px",
            marginTop: "10px",
            animation: "sway 3s ease-in-out infinite",
            transformOrigin: "bottom center",
            borderRadius: "10px"
          }}
        />
     
       {/* call button  */}
       <Button as={Link} to={`tel:/923094282079?text=Hello%2C%20I%20am%20interested%20in%20buying%20the%20Aloe%20Vera%20plant.%20Can%20you%20give%20me%20more%20details%3F"`} variant="primary mx-2 mt-3">call</Button>

        {/* Animation CSS */}
        <style>{`
          @keyframes sway {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(2deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(-2deg); }
            100% { transform: rotate(0deg); }
          }
        `}</style>
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

      {/* Products Section */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100">
                {product.image && (
                  <img
                    src={`https://test-backend-t3bb.onrender.com/${product.image}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text" style={{ height: "40px", overflow: "hidden" }}>
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

      {/* Detail Button hover green */}
      <style>{`
        .detail-btn {
          font-size: 14px;
          padding: 5px 10px;
          background-color: #007bff;
          border: none;
          color: white;
          transition: background-color 0.3s ease;
        }
        .detail-btn:hover {
          background-color: green;
        }
      `}</style>
    </div>
  );
}

export default Home;

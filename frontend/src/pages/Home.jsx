import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 Navigation layi

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // 👈 Initialize navigation

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Home Page - Products</h1>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card h-100">
              {product.image && (
                <img
                  src={`http://localhost:5000/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text" style={{ height: "100px", overflow: "hidden" }}>
                  {product.description}
                </p>
                <p className="card-text fw-bold">Price: Rs. {product.price}</p>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleViewDetails(product._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when starting API request
    axios
      .get(`https://test-backend-t3bb.onrender.com/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false if error occurs
        if (err.response && err.response.status === 404) {
          alert("پروڈکٹ نہیں ملی۔");
          navigate("/"); // Navigate to home if product is not found
        }
      });
  }, [id, navigate]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" role="status" /> Loading...</div>;

  if (!product) return <div className="text-center mt-5">No product found!</div>;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        ← back
      </button>

      <div className="card shadow-lg">
        <div className="row g-0">
          {/* Product Image */}
          <div className="col-md-6">
            {product.image && (
              <img
                src={`https://test-backend-t3bb.onrender.com/${product.image}`}
                className="img-fluid rounded-start"
                alt={product.name}
                style={{ height: "100%", objectFit: "cover" }}
              />
            )}
          </div>

          {/* Product Details */}
          <div className="col-md-6 d-flex flex-column justify-content-between p-4">
            <div>
              <h2 className="card-title mb-3">{product.name}</h2>
              <p className="card-text">{product.description}</p>
              <h4 className="text-success fw-bold">قیمت: Rs. {product.price}</h4>
            </div>

            <div className="mt-4 d-flex justify-content-between">
              <Button
                as={Link}
                to={`https://wa.me/923094282079?text=%21%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%DB%8C%DA%A9%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%DB%83%20%D8%A7%D9%84%D9%84%DB%81`}
                variant="success"
                className="me-2"
              >
                WhatsApp
              </Button>

              <Button
                as={Link}
                to="tel:/923094282079"
                variant="primary"
              >
                Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

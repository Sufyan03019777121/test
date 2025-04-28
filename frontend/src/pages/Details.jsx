import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from "axios";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // صحیح API URL '/api/products/:id' استعمال کریں
    axios.get(`https://test-backend-t3bb.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.log(err);
        // اگر پروڈکٹ نہ ملے تو
        if (err.response && err.response.status === 404) {
          alert("پروڈکٹ نہیں ملی۔");
          navigate("/"); // ہوم پیج پر واپس لے جاؤ
        }
      });
  }, [id, navigate]);

  if (!product) return <div className="text-center mt-5">Loding...</div>;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        ← back
      </button>

      <div className="card">
        <div className="row">
          <div className="col-md-6">{product.image && (
            <img
              src={`https://test-backend-t3bb.onrender.com/${product.image}`}
              className="card-img-top"
              alt={product.name}
              style={{ height: "400px", objectFit: "cover" }}
            />
          )}</div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="card-text">{product.description}</p>
              <h4 className="card-text text-success"> Rs. {product.price}</h4>
            </div>
            {/* whatsapp button */}
            <Button as={Link} to={`https://wa.me/923094282079?text=Hello%2C%20I%20am%20interested%20in%20buying%20the%20Aloe%20Vera%20plant.%20Can%20you%20give%20me%20more%20details%3F"`} variant="success mx-2 mt-3">whatsapp</Button>
            {/* call button  */}
            <Button as={Link} to={`tel:/923094282079?text=Hello%2C%20I%20am%20interested%20in%20buying%20the%20Aloe%20Vera%20plant.%20Can%20you%20give%20me%20more%20details%3F"`} variant="primary mx-2 mt-3">call</Button>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Details;

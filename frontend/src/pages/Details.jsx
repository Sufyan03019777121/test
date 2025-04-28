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
                    <Button
                      as={Link}
                      to={`https://wa.me/923094282079?text=%21%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%DB%8C%DA%A9%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%DB%83%20%D8%A7%D9%84%D9%84%DB%81`}
                      variant="success mx-2 mt-3"
                    >
                      WhatsApp
                    </Button>

            {/* call button  */}
            <Button as={Link} to={`tel:/923094282079`} variant="primary mx-2 mt-3">call</Button>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Details;

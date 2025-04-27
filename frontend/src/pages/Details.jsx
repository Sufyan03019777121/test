import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
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

  if (!product) return <div className="text-center mt-5">لوڈ ہو رہا ہے...</div>;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        ← واپس
      </button>

      <div className="card">
        {product.image && (
          <img
            src={`http://localhost:5000/${product.image}`}
            className="card-img-top"
            alt={product.name}
            style={{ height: "400px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p className="card-text">{product.description}</p>
          <h4 className="card-text text-success">قیمت: Rs. {product.price}</h4>
        </div>
      </div>
    </div>
  );
}

export default Details;

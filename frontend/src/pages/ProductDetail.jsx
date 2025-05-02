import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} className="img-fluid" />
      <p>{product.description}</p>
      <p>Price: Rs. {product.price}</p>
    </div>
  );
}

export default ProductDetail;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPhone, FaWhatsapp } from 'react-icons/fa';

function ProductDetail({ products }) {
  const { id } = useParams();  // get product id from URL params
  const product = products.find(p => p._id === id);  // find the product

  if (!product) return <p>Product not found</p>;  // fallback if no product is found

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3"><FaArrowLeft /> Back</Link>
      <div className="card">
        <img src={product.image} className="card-img-top" alt={product.title} style={{ maxHeight: 'auto', objectFit: 'cover' }} />
        <div className="card-body">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <h5>Rs: {product.price}</h5>
          <div className="d-flex gap-2 mt-3">
            <a href="https://wa.me/923094282079?text=السلام%20علیکم%2C%20مجھے%20پودے%20چاہیئے%20ہیں%2C%20رابطہ%20کیجیے۔" className="btn btn-success"><FaWhatsapp /> WhatsApp</a>
            <a href="tel:+923094282079" className="btn btn-primary"><FaPhone /> Call</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

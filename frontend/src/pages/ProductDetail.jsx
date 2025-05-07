
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPhone, FaWhatsapp } from 'react-icons/fa';

function ProductDetail({ products }) {
  const { id } = useParams();
  const product = products.find(p => p._id === id);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="container pt-4 pb-5">
      {/* Back button */}
      <Link to="/" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft /> Back
      </Link>

      {/* Product Card */}
      <div className="card border-0  shadow">
        <div className="card-body">
          <h3 className="text-success">{product.title}</h3>
          {/* Images Grid */}
          <div className="d-flex flex-wrap gap-2 mt-3 border-0  shadow">
            {product.images && product.images.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className='border-0 '
                style={{
                  width: '100%',
                  height: 'auto',
                  overflow: 'auto',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <img
                  src={img}
                  alt={`Product ${index}`}
                  className="border-0"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          <p>{product.description}</p>
          <h5 className="text-primary">Rs: {product.price}</h5>

        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="position-fixed bottom-0 start-0 end-0 bg-light border-top p-2 d-flex justify-content-center gap-3" style={{ zIndex: 999 }}>
        <a href="https://wa.me/923094282079?text=السلام%20علیکم%2C%20مجھے%20پودے%20چاہیئے%20ہیں%2C%20رابطہ%20کیجیے۔"
          className="btn btn-success d-flex align-items-center gap-2"
          target="_blank" rel="noopener noreferrer">
          <FaWhatsapp /> WhatsApp
        </a>
        <a href="tel:+923094282079" className="btn btn-primary d-flex align-items-center gap-2">
          <FaPhone /> Call
        </a>
      </div>
    </div>
  );
}

export default ProductDetail;
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

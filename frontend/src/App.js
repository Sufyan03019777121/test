import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(err => console.log(err));
  }, []);

  const showProductDetail = (productId) => {
    const product = products.find(p => p._id === productId);
    setProductDetail(product);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">🌱 Product List</h1>

      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description.slice(0, 80)}...</p>
                <button
                  className="btn btn-primary"
                  onClick={() => showProductDetail(product._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {productDetail && (
        <div className="mt-5">
          <h2 className="text-center mb-4">📝 Product Details</h2>
          <div className="card mx-auto" style={{ maxWidth: '600px' }}>
            <img
              src={productDetail.image}
              alt={productDetail.title}
              className="card-img-top"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{productDetail.title}</h5>
              <p className="card-text">{productDetail.description}</p>
              <p className="card-text fw-bold">💰 Price: Rs. {productDetail.price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

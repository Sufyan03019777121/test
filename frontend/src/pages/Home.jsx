import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaPhoneAlt, FaSearch, FaLeaf } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      axios.get('https://demo-backend-ti0w.onrender.com/')
        .then(() => console.log('Ping sent to backend'))
        .catch((err) => console.error('Ping failed:', err));
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://demo-backend-ti0w.onrender.com/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div   className="container pb-5 pt-3 bg-light " >
      {/* Header */}
      <div className="px-3 d-flex border justify-content-between align-items-center mb-4"
      style={{ backgroundColor: "#eafdea"}}
       >
        <h2 className="text-success pt-2">  🌿 NS_Nursery</h2>
        <div className="d-flex gap-3">
          <a href="https://wa.me/923094282079?text=السلام%20علیکم%2C%20مجھے%20پودے%20چاہیئے%20ہیں%2C%20رابطہ%20کیجیے۔"
            target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={24} className="text-success" />
          </a>
          <a href="tel:+923094282079">
            <FaPhoneAlt size={20} className="text-primary" />
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="input-group mb-4">
        <span className="input-group-text"><FaSearch /></span>
        <input type="text" className="form-control" placeholder="Search by name..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <span className="input-group-text">Total: {filteredProducts.length}</span>
      </div>

      {/* Product Cards */}
      <div className="  row row-cols-2 row-cols-sm-2 row-cols-md-3 g-4">
        {filteredProducts.map(product => (
          <div key={product._id} className="col">
            <div className="card h-100 border-0">
              <img src={product.image} 
              className=" card-img-top rounded-3 p-1" alt={product.title}
              style={{ border: "1px solid green" }}/>
              <div className="card-body w-100  rounded-3 mt-1"
              style={{ backgroundColor: "#f9fff5",border: "1px solid green"}}>
                <h5 className="card-title text-success">{product.title}</h5>
                <p className=" card-text text-truncate ">{product.description}</p>
                <span className=" card-text text-primary"><strong>Rs:</strong> {product.price}
                </span><br />

                <button className="btn btn-outline-success float-start btn-sm mt-3"
                    onClick={() => navigate(`/product/${product._id}`)}>Detail</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="position-fixed bottom-0 start-0 end-0 bg-light border-top p-2 d-flex justify-content-center gap-3"
        style={{ zIndex: 999 }}>
        <a href="https://wa.me/923094282079?text=السلام%20علیکم%2C%20مجھے%20پودے%20چاہیئے%20ہیں%2C%20رابطہ%20کیجیے۔"
          className="btn btn-success d-flex align-items-center gap-2"
          target="_blank" rel="noopener noreferrer">
          <FaWhatsapp /> WhatsApp
        </a>
        <a href="tel:+923094282079" className="btn btn-primary d-flex align-items-center gap-2">
          <FaPhoneAlt /> Call
        </a>
      </div>
    </div>
  );
}

export default Home;

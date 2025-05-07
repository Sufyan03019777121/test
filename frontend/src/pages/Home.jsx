
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaPhoneAlt, FaSearch } from 'react-icons/fa';
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
    <div className="container pb-5 pt-3 bg-light">
      {/* Header */}
      <div className="px-3 d-flex shadow justify-content-between align-items-center " style={{ backgroundColor: "#eafdea" }}>
        <h2 className="text-success pt-2">🌿 NS_Nursery </h2>

        <div className="d-flex gap-3">
          <a href="https://wa.me/923094282079?text=السلام%20علیکم%2C%20مجھے%20پودے%20چاہیئے%20ہیں%2C%20رابطہ%20کیجیے۔" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={24} className="text-success" />
          </a>
          <a href="tel:+923094282079">
            <FaPhoneAlt size={20} className="text-primary" />
          </a>
        </div>
      </div>
      <span className="px-3 d-flex shadow justify-content-between align-items-center my-2 text-primary " style={{ backgroundColor: "#fdf6e2" }} >
       <h2>Plants</h2>
       <h2>&</h2>
       <h2>Services</h2>
      </span>

      {/* Search Bar */}
      <div className="input-group mb-4 shadow">
        <span className="input-group-text"><FaSearch /></span>
        <input type="text" className="form-control " placeholder="Search by name..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <span className="input-group-text">Total: {filteredProducts.length}</span>
      </div>

      {/* Product Cards with 4 Images */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {filteredProducts.map(product => (
          <div key={product._id} className="col">
            <div className="card h-100 border-0  shadow" style={{ backgroundColor: "#fcfceb" }}>
              <div className="card-img-top d-flex  flex-wrap shadow-sm ">
                {/* Displaying 4 images in a row */}
                {product.images && product.images.slice(0, 4).map((image, index) => (
                  <div className='shadow-sm'
                    style={{
                      width: '48%',
                      height: "130px",
                      overflow: 'auto',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',

                      margin: "2px",
                      WebkitOverflowScrolling: 'touch',
                    }} >
                    <div
                      style={{
                        width: '90%',
                        height: 'auto',

                      }}>
                      <img key={index} src={image} alt={product.title}
                        className="m-1 "
                        style={{ width: '104%', height: 'auto', objectFit: 'cover' }}
                      />
                    </div>
                  </div>



                ))}
              </div>
              <div className="card-body justify-content-between d-flex w-100 rounded-3 mt-1">
                <h5 className="card-title text-success">{product.title}

                </h5>


                <button className="btn btn-outline-success float-start btn-sm "
                  onClick={() => navigate(`/product/${product._id}`)}>Detail</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="position-fixed bottom-0 start-0 end-0 bg-light border-top p-2 d-flex justify-content-center gap-3" style={{ zIndex: 999 }}>
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

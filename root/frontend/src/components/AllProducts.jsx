import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import axios from 'axios';
import NavBar from './NavBar';
import '../App.css';
import '../style/AllProducts.css';

function AllProducts() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/products');
        setProducts(response.data.data.products);
        setIsLoading(false);
        console.log(response);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="loading-animation"></div>;
  }

  if (!products) {
    return <div>No data available.</div>;
  }

  return (
    <>
      <NavBar />
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-card-header">
              <h3 className="product-name">{product.name}</h3>
            </div>
            <div className="product-card-main">
              <p className="product-description">{product.description}</p>
            </div>

            <div className="product-card-footer">
              <p className="product-price">€{product.price}</p>
              <div className="product-btn-container">
                <button className="product-btn-container-details">
                  Details
                </button>
                <button
                  className="product-btn-container-addToCart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllProducts;

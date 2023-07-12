import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';
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
    return (
      <div className="loading-overlay">
        <div className="loading-animation"></div>
      </div>
    );
  }

  if (!products) {
    return <div>No data available.</div>;
  }

  return (
    <div className="all-products-page">
      <div>
        <NavBar />
        <Link to="/">
          <button className="back-button">Back</button>
        </Link>
      </div>
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
              {product.discount > 0 ? (
                <p className="product-price">
                  <strong>Price:</strong>{' '}
                  <span className="old-price">{product.price} €</span>
                  <span className="new-price">
                    {' '}
                    {(
                      product.price -
                      product.price * (product.discount / 100)
                    ).toFixed(2)}{' '}
                    €
                  </span>
                </p>
              ) : (
                <p className="product-price">
                  <strong>Price:</strong> {product.price} €
                </p>
              )}
              <div className="product-btn-container">
                <Link
                  to={`/products/${product._id}`}
                  className="product-btn-container-details"
                >
                  Details
                </Link>
                {product.stock > 0 ? (
                  <button
                    className="product-btn-container-addToCart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                ) : (
                  <button className="out-of-stock-button" disabled>
                    Out of stock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AllProducts;

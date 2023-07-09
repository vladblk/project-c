import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';
import '../style/Loading.css';
import '../style/ProductDetail.css';
import '../App.css';

function ProductDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [reviewsCount, setReviewsCount] = useState('');

  console.log(`Reviews count: ${reviewsCount}`);

  const handleReviewTextChange = (event) => setReview(event.target.value);
  const handleReviewRatingChange = (event) => setRating(event.target.value);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${params.productID}`
        );
        setProduct(response.data.data.product);
        // setReviewsCount(response.data.data.product.reviews.length);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.productID, reviewsCount]);

  console.log(product);

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-animation"></div>
      </div>
    );
  }

  if (!product) {
    return <div>No data available.</div>;
  }

  console.log(product);
  console.log(review);
  console.log(rating);

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(
        `/api/v1/products/${params.productID}/reviews`,
        {
          review: review,
          rating: rating,
        }
      );

      setProduct((prevProduct) => ({
        ...prevProduct,
        reviews: [...prevProduct.reviews, response.data.data.productReview],
      }));

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`/api/v1/products/${params.productID}`);
      navigate('/products');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteReview = async (reviewID) => {
    try {
      await axios.delete(`/api/v1/productReviews/${reviewID}`);
      setReviewsCount(product.reviews.length);
      console.log(reviewsCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <Link to="/products">
        <button className="back-button">Back</button>
      </Link>
      <div className="product--detail">
        <h2 className="product--detail__name">{product.name}</h2>
        <span className="product--detail__code">
          Product code: {product._id}
        </span>
        <div className="product--detail__ratings">
          <span>Rating: </span>
          <span className="rating-quantity">{product.ratingsQuantity}</span>
          <span className="rating-average">({product.ratingsAverage})</span>
        </div>
        <p className="product--detail__description">{product.description}</p>
        <div className="product--detail__details">
          {product.discount > 0 ? (
            <p>
              <strong>Price:</strong>{' '}
              <span className="old-price">{product.price} €</span>
              <span className="new-price">
                {' '}
                {(
                  product.price -
                  product.price * (product.discount / 100)
                ).toFixed(2)}{' '}
                € - {product.discount}% Discount!
              </span>
            </p>
          ) : (
            <p>
              <strong>Price:</strong> {product.price} €
            </p>
          )}
        </div>
        <div className="btn-container">
          <button
            className="book-now-btn"
            onClick={() => handleAddToCart(product)}
          >
            Add to cart
          </button>
          {user.role === 'admin' && (
            <button className="deleteProductBtn" onClick={handleDeleteProduct}>
              Delete Product
            </button>
          )}
        </div>
        <div className="product--detail__reviews">
          <h3>Reviews</h3>
          {user.isLoggedIn ? (
            <div className="product--detail__reviews--add">
              <label className="addReviewText-label">Leave us a review:</label>
              <input
                type="text"
                className="addReviewText"
                placeholder="Add a review"
                value={review}
                onChange={handleReviewTextChange}
              />
              <label className="addReviewRating-label">
                How satisfied were you?
                <select
                  id="rating"
                  className="addReviewRating"
                  value={rating}
                  onChange={handleReviewRatingChange}
                >
                  <option value="5" defaultChecked>
                    5 | Very satisfied
                  </option>
                  <option value="4">4 | Pretty satisfied</option>
                  <option value="3">3 | Satisfied</option>
                  <option value="2">2 | Not so satisfied</option>
                  <option value="1">1 | Horrible!</option>
                </select>
              </label>
              <div>
                <button className="addReviewBtn" onClick={handleReviewSubmit}>
                  Add Review
                </button>
              </div>
            </div>
          ) : (
            <div className="product--detail__reviews-add">
              <p className="signedInAlert">
                You need to be signed in to leave a review!
              </p>
            </div>
          )}
          <div className="product--detail__reviews-list">
            {product.reviews
              .slice()
              .reverse()
              .map((review) => (
                <div key={review._id} className="product--detail__review">
                  <p className="review-user">
                    Reviewed by:{' '}
                    {review.user.name ? review.user.name : user.name}
                  </p>
                  <p className="review-rating">Rating: {review.rating}</p>
                  <p className="review-text">{review.review}</p>
                  {user.role === 'admin' && (
                    <FaTrashAlt
                      onClick={() => handleDeleteReview(review._id)}
                      className="delete-review-btn"
                    />
                  )}
                  {review.user._id === user._id && (
                    <FaTrashAlt
                      onClick={() => handleDeleteReview(review._id)}
                      className="delete-review-btn"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;

import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';
import '../style/Loading.css';
import '../style/CampDetail.css';
import '../App.css';

function CampDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [camp, setCamp] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [reviewsCount, setReviewsCount] = useState('');

  console.log(`Reviews count: ${reviewsCount}`);

  const handleReviewTextChange = (event) => setReview(event.target.value);
  const handleReviewRatingChange = (event) => setRating(event.target.value);

  const handleAddToCart = (camp) => {
    addToCart(camp);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/camps/${params.campID}`
        );
        setCamp(response.data.data.camp);
        // setReviewsCount(response.data.data.camp.reviews.length);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.campID, reviewsCount]);

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-animation"></div>
      </div>
    );
  }

  if (!camp) {
    return <div>No data available.</div>;
  }

  console.log(camp);
  console.log(review);
  console.log(rating);

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(
        `/api/v1/camps/${params.campID}/reviews`,
        {
          review: review,
          rating: rating,
        }
      );

      setCamp((prevCamp) => ({
        ...prevCamp,
        reviews: [...prevCamp.reviews, response.data.data.review],
      }));

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCamp = async () => {
    try {
      await axios.delete(`/api/v1/camps/${params.campID}`);
      navigate('/camps');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteReview = async (reviewID) => {
    try {
      await axios.delete(`/api/v1/reviews/${reviewID}`);
      setReviewsCount(camp.reviews.length);
      console.log(reviewsCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <Link to="/camps">
        <button className="back-button">Back</button>
      </Link>
      <div className="camp--detail">
        <h2 className="camp--detail__name">{camp.name}</h2>
        <span className="camp--detail__code">Camp code: {camp._id}</span>
        <p className="location">{camp.location.address}</p>
        <div className="camp--detail__ratings">
          <span>Rating: </span>
          <span className="rating-quantity">{camp.ratingsQuantity}</span>
          <span className="rating-average">({camp.ratingsAverage})</span>
        </div>
        <p className="camp--detail__description">{camp.description}</p>
        <div className="camp--detail__details">
          <p>
            <strong>Maximum Group Size:</strong> {camp.maxGroupSize}
          </p>
          <p>
            <strong>Duration:</strong> {camp.duration} days
          </p>
          {camp.discount > 0 ? (
            <p>
              <strong>Price:</strong>{' '}
              <span className="old-price">{camp.price} EUR/Night</span>
              <span className="new-price">
                {' '}
                {(camp.price - camp.price * (camp.discount / 100)).toFixed(
                  2
                )}{' '}
                EUR/Night - {camp.discount}% Discount!
              </span>
            </p>
          ) : (
            <p>
              <strong>Price:</strong> {camp.price} EUR/Night
            </p>
          )}
        </div>
        <div className="btn-container">
          <button
            className="book-now-btn"
            onClick={() => handleAddToCart(camp)}
          >
            Add to cart
          </button>
          {user.role === 'admin' && (
            <button className="deleteCampBtn" onClick={handleDeleteCamp}>
              Delete Camp
            </button>
          )}
        </div>
        <div className="camp--detail__reviews">
          <h3>Reviews</h3>
          {user.isLoggedIn ? (
            <div className="camp--detail__reviews--add">
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
            <div className="camp--detail__reviews-add">
              <p className="signedInAlert">
                You need to be signed in to leave a review!
              </p>
            </div>
          )}
          <div className="camp--detail__reviews-list">
            {camp.reviews
              .slice()
              .reverse()
              .map((review) => (
                <div key={review._id} className="camp--detail__review">
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

export default CampDetail;

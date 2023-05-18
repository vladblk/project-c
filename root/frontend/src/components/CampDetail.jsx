import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import '../style/Loading.css';
import '../style/CampDetail.css';
import '../App.css';

function CampDetail() {
  const params = useParams();
  const [camp, setCamp] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/camps/${params.campID}`
        );
        setCamp(response.data.data.camp);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.campID]);

  if (isLoading) {
    return <div className="loading-animation"></div>;
  }

  if (!camp) {
    return <div>No data available.</div>;
  }

  console.log(camp);

  return (
    <>
      <NavBar />
      <Link to="/camps">
        <button className="back-button">Back</button>
      </Link>
      <div className="camp--detail">
        <h2 className="camp--detail__name">{camp.name}</h2>
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
          <p>
            <strong>Price:</strong> {camp.price} EUR/Night
          </p>
        </div>
        <button className="book-now-btn">Book Now</button>
        <div className="camp--detail__reviews">
          <h3>Reviews</h3>
          <div className="camp--detail__reviews-list">
            {camp.reviews.map((review) => (
              <div key={review.id} className="camp--detail__review">
                <p className="review-user">Reviewed by: {review.user.name}</p>
                <p className="review-rating">Rating: {review.rating}</p>
                <p className="review-text">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CampDetail;

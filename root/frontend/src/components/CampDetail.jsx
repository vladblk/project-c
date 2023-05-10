import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import '../style/CampDetail.css';
import '../App.css';

function CampDetail() {
  const params = useParams();
  const [camp, setCamp] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/api/v1/camps/${params.campID}`)
      .then((response) => {
        console.log(response.data);
        setCamp(response.data.data.camp);
      });
  }, [params.campID]);

  console.log(camp);

  return (
    <>
      <NavBar />
      <Link to="/camps">
        <button className="back-button">Back</button>
      </Link>
      <div className="camp--detail">
        <h2 className="camp--detail__name">{camp.name}</h2>
        {/* <p className="location">{camp.location.address}</p> */}
        <p className="camp--detail__ratings">
          Ratings: {camp.ratingsQuantity} ({camp.ratingsAverage})
        </p>
        <p className="camp--detail__description">
          Description: {camp.description}
        </p>
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
      </div>
    </>
  );
}

export default CampDetail;

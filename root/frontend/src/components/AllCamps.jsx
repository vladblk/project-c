import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import '../style/AllCamps.css';
import '../App.css';

function AllCamps() {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/v1/camps')
      .then((response) => {
        console.log(response);
        setCamps(response.data.data.camps);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
      <div className="all-camps-container">
        {camps.map((camp) => (
          <div key={camp._id} className="camp-card">
            <div className="camp-card-content">
              <h2 className="camp-card-title">{camp.name}</h2>
              <p className="camp-card-summary">{camp.summary}</p>
              <button className="camp-card-button">Camp Details</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllCamps;

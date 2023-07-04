import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import '../style/AllCamps.css';
import '../style/Loading.css';
import '../App.css';

function AllCamps() {
  const [camps, setCamps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/camps');
        setCamps(response.data.data.camps);
        setIsLoading(false);
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

  if (!camps) {
    return <div>No data available.</div>;
  }

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
              <p className="camp-card-price">{camp.price} EUR/night</p>
              <div className="camp-card-btns">
                <Link to={`/camps/${camp.id}`} className="camp-card-button">
                  Camp Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllCamps;

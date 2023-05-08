import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllCamps() {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    axios
      .get('/api/camps')
      .then((response) => {
        setCamps(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {camps.map((camp) => (
        <div key={camp._id}>
          <h2>{camp.name}</h2>
          <p>{camp.description}</p>
        </div>
      ))}
    </div>
  );
}

export default AllCamps;

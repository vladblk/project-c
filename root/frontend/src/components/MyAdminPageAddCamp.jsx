import React, { useState } from 'react';
import axios from 'axios';
import '../style/MyAdminPageAddCamp.css';

const MyAdminPageAddCamp = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [duration, setDuration] = useState('');
  const [maxGroupSize, setMaxGroupSize] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new camp object with form data
    const newCamp = {
      name,
      price: parseFloat(price),
      discount: parseFloat(discount),
      duration: parseInt(duration),
      maxGroupSize: parseInt(maxGroupSize),
      difficulty,
      summary,
      description,
      country,
      location: {
        type: 'Point',
        coordinates: [],
        address,
      },
    };

    // Save new camp to database
    try {
      // Send a POST request to add the new camp to the database
      const response = await axios.post('/api/v1/camps', newCamp);
      console.log(response.data); // Log the response from the server

      // Reset the form
      setName('');
      setPrice('');
      setDiscount('');
      setDuration('');
      setMaxGroupSize('');
      setDifficulty('easy');
      setSummary('');
      setDescription('');
      setCountry('');
      setAddress('');
    } catch (error) {
      console.error(error); // Log any errors
    }

    // Reset the form
    setName('');
    setPrice('');
    setDiscount('');
    setDuration('');
    setMaxGroupSize('');
    setDifficulty('easy');
    setSummary('');
    setDescription('');
    setCountry('');
    setAddress('');
  };

  return (
    <div className="container">
      <h1 className="title">Add New Camp</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="label">
            Price:
          </label>
          <input
            type="number"
            id="price"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="discount" className="label">
            Discount:
          </label>
          <input
            type="number"
            id="discount"
            className="input"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration" className="label">
            Duration:
          </label>
          <input
            type="number"
            id="duration"
            className="input"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxGroupSize" className="label">
            Max Group Size:
          </label>
          <input
            type="number"
            id="maxGroupSize"
            className="input"
            value={maxGroupSize}
            onChange={(e) => setMaxGroupSize(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty" className="label">
            Difficulty:
          </label>
          <select
            id="difficulty"
            className="input"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="summary" className="label">
            Summary:
          </label>
          <textarea
            id="summary"
            className="textarea"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="label">
            Description:
          </label>
          <textarea
            id="description"
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country" className="label">
            Country:
          </label>
          <input
            type="text"
            id="country"
            className="input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="label">
            Address:
          </label>
          <input
            type="text"
            id="address"
            className="input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <input type="submit" value="Add Camp" className="submit-btn" />
      </form>
    </div>
  );
};

export default MyAdminPageAddCamp;

import React, { useState } from 'react';
import axios from 'axios';
import '../style/MyAdminPageAddCamp.css';
import '../style/MyAdminPageEditCamp.css';

const MyAdminPageEditCamp = () => {
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
  const [campID, setCampID] = useState('');

  const handleFind = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/v1/camps/${campID}`);
      console.log(response.data.data.camp);

      const {
        name,
        price,
        discount,
        duration,
        maxGroupSize,
        difficulty,
        summary,
        description,
        country,
      } = response.data.data.camp;

      const { address } = response.data.data.camp.location;

      setName(name);
      setPrice(price);
      setDiscount(discount);
      setDuration(duration);
      setMaxGroupSize(maxGroupSize);
      setDifficulty(difficulty);
      setSummary(summary);
      setDescription(description);
      setCountry(country);
      setAddress(address);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the found camp object with form data
    const camp = {
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
      const response = await axios.patch(`/api/v1/camps/${campID}`, camp);
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
      <h1 className="title">Edit Camp</h1>
      <form className="find-form" onSubmit={handleFind}>
        <label htmlFor="id" className="label">
          CampID:
        </label>
        <input
          type="text"
          id="id"
          className="input"
          value={campID}
          onChange={(e) => setCampID(e.target.value)}
        />
        <input type="submit" value="Find Camp" className="find-btn" />
      </form>

      {name.length > 0 && (
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

          <input type="submit" value="Edit Camp" className="submit-btn" />
        </form>
      )}
    </div>
  );
};

export default MyAdminPageEditCamp;

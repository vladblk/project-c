import React, { useState } from 'react';
import axios from 'axios';
import '../style/MyAdminPageAddCamp.css'; // take styles from camp css
import '../style/MyAdminPageEditCamp.css'; // take styles from camp css

const MyAdminPageEditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [productID, setProductID] = useState('');

  const handleFind = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/v1/products/${productID}`);
      console.log(response.data.data.product);

      const { name, price, stock, description } = response.data.data.product;

      setName(name);
      setPrice(price);
      setStock(stock);
      setDescription(description);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new camp object with form data
    const product = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
    };

    // Save new camp to database
    try {
      // Send a POST request to add the new camp to the database
      const response = await axios.patch(
        `/api/v1/products/${productID}`,
        product
      );
      console.log(response);

      // Reset the form
      setName('');
      setPrice('');
      setStock('');
      setDescription('');
    } catch (error) {
      console.error(error); // Log any errors
    }

    // Reset the form
    setName('');
    setPrice('');
    setStock('');
    setDescription('');
  };

  return (
    <div className="container">
      <h1 className="title">Edit Product</h1>
      <form className="find-form" onSubmit={handleFind}>
        <label htmlFor="id" className="label">
          ProductID:
        </label>
        <input
          type="text"
          id="id"
          className="input"
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
        />
        <input type="submit" value="Find Product" className="find-btn" />
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
            <label htmlFor="stock" className="label">
              Stock:
            </label>
            <input
              type="number"
              id="quantity"
              className="input"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
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

          <input type="submit" value="Edit Product" className="submit-btn" />
        </form>
      )}
    </div>
  );
};

export default MyAdminPageEditProduct;

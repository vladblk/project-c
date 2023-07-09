import React, { useState } from 'react';
import axios from 'axios';
import '../style/MyAdminPageAddCamp.css';

const MyAdminPageAddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new camp object with form data
    const newProduct = {
      name,
      price: parseFloat(price),
      discount: parseFloat(discount),
      stock: parseInt(stock),
      description,
    };

    // Save new camp to database
    try {
      // Send a POST request to add the new camp to the database
      const response = await axios.post('/api/v1/products', newProduct);
      console.log(response.data); // Log the response from the server

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
      <h1 className="title">Add New Product</h1>
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
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock" className="label">
            Stock:
          </label>
          <input
            type="number"
            id="stock"
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

        <input type="submit" value="Add Product" className="submit-btn" />
      </form>
    </div>
  );
};

export default MyAdminPageAddProduct;

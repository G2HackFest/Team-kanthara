import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './ProductForm.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    producer: '',
    contactInfo: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products/add', formData);
      alert('Product added successfully!');
      console.log(response.data);
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        producer: '',
        contactInfo: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="product-form-container">
      {/* Go Back Button */}
      <button 
        className="y"
        onClick={() => navigate('/dashboard')} // Navigate to the dashboard
      >
        Go Back
      </button>

      <h2 className="x">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="x">
          <label>Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="x">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <div className="x">
          <label>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="x">
          <label>Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <div className="x">
          <label>Producer</label>
          <input type="text" name="producer" value={formData.producer} onChange={handleChange} required />
        </div>
        <div className="x">
          <label>Contact Info</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
            placeholder="Enter your email or phone number"
          />
        </div>
        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;

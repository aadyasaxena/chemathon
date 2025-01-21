import React, { useState } from 'react';
import './Registration.css';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    university: '',
    type: 'Hackathon Only', // Default value for registration type
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Registration Successful');
    // Add backend connection here.
  };

  return (
    <section id="register" className="registration">
      <div className="registration-container">
        <h2>Register for Chem-A-Thon 6.0</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <label htmlFor="mobile">Mobile:</label>
          <input
            id="mobile"
            type="tel"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            required
          />
          <label htmlFor="university">University:</label>
          <select
            id="university"
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            required
          >
            <option value="">Select University</option>
            <option value="VIT Vellore">VIT Vellore</option>
            <option value="IIT Bombay">IIT Bombay</option>
            {/* Add more universities */}
          </select>
          <label htmlFor="type">Registration Type:</label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="Hackathon Only">Hackathon Only</option>
            <option value="Hackathon + Talk Show">Hackathon + Talk Show</option>
          </select>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </section>
  );
}

export default Registration;

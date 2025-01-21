import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    university: '', // Dropdown selection
    option: 'Hackathon Only', // Default option
  });

  const universities = [
    'Vellore Institute of Technology, Vellore',
    'Indian Institute of Technology, Bombay',
    'Indian Institute of Technology, Delhi',
    'Birla Institute of Technology and Science, Pilani',
    'National Institute of Technology, Trichy',
    'Manipal Academy of Higher Education, Manipal',
    'University of Delhi, Delhi',
    'Banaras Hindu University, Varanasi',
    'Jadavpur University, Kolkata',
    'Anna University, Chennai',
    'SRM Institute of Science and Technology, Chennai',
    'Amity University, Noida',
    'Lovely Professional University, Punjab',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedLink =
      formData.option === 'Hackathon + Talk Show'
        ? 'https://payment.example.com/hackathon-talkshow' // Replace with actual link
        : 'https://payment.example.com/hackathon'; // Replace with actual link

    alert(`Registration successful for ${formData.option}! Redirecting to payment.`);
    window.location.href = selectedLink;
  };

  return (
    <div className="register-container">
      {/* University Logo */}
      <div className="logo-container">
        <img
          url="/Users/aadyasaxena/.vscode/my-new-website/src/assets/images/vellore-institute-of-technology-vit-logo-vector-2022.png" // Replace with actual logo URL
          alt="VIT Logo"
          className="logo"
        />
        <h3>Organized by AIChE-VIT</h3>
      </div>

      <h2 className="register-title">Register for Chem-A-Thon 6.0</h2>
      <p className="register-description">
        Join us for the flagship event of AIChE-VIT, Vellore Institute of Technology, Vellore.
      </p>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="register-input"
        />

        {/* University Dropdown */}
        <div className="dropdown-container">
          <label className="dropdown-label">Select Your University:</label>
          <select
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
            className="register-dropdown"
          >
            <option value="" disabled>
              -- Select Your University --
            </option>
            {universities.map((university, index) => (
              <option key={index} value={university}>
                {university}
              </option>
            ))}
          </select>
        </div>

        {/* Registration Options */}
        <div className="dropdown-container">
          <label className="dropdown-label">Select Registration Type:</label>
          <select
            name="option"
            value={formData.option}
            onChange={handleChange}
            required
            className="register-dropdown"
          >
            <option value="Hackathon Only">Hackathon + Talk Show </option>
            <option value="Hackathon + Talk Show">Talk Show Only</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Submit & Pay
        </button>
      </form>
    </div>
  );
};

export default Register;

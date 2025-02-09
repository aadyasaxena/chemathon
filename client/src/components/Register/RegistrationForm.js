import React, { useState } from "react";
import "./Registration.css";
import vitlogo from "../../assets/images/vellore-institute-of-technology-vit-logo-vector-2022.png";

const universities = [
  "Vellore Institute of Technology, Vellore",
  "Indian Institute of Technology, Bombay",
  "Indian Institute of Technology, Delhi",
  "Birla Institute of Technology and Science, Pilani",
  "National Institute of Technology, Trichy",
  "Manipal Academy of Higher Education, Manipal",
  "University of Delhi, Delhi",
  "Banaras Hindu University, Varanasi",
  "Jadavpur University, Kolkata",
  "Anna University, Chennai",
  "SRM Institute of Science and Technology, Chennai",
  "Amity University, Noida",
  "Lovely Professional University, Punjab",
];

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    email: "",
    mobile: "",
    university: "",
    option: "Hackathon + Talk Show",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success"); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setPopupType("error");
        setPopupMessage(
          data.message || "Registration failed. Please try again."
        );
      } else {
        setPopupType("success");
        setPopupMessage(
          "Thank you for registering for Chem-A-Thon 6.0! We look forward to seeing you there."
        );
        setFormData({
          name: "",
          regno: "",
          email: "",
          mobile: "",
          university: "",
          option: "Hackathon + Talk Show",
        }); // Clear form
      }
      setShowPopup(true);
    } catch (error) {
      setPopupType("error");
      setPopupMessage(
        "An unexpected error occurred. Please check your connection and try again."
      );
      setShowPopup(true);
      console.error("Registration error:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="register-container">
      {/* University Logo */}
      <div className="logo-container">
        <img src={vitlogo} alt="VIT Logo" className="logo" />
        <h3>Organized by AIChE-VIT</h3>
      </div>

      <h2 className="register-title">Register for Chem-A-Thon 6.0</h2>
      <p className="register-description">Join our amazing event!</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="dropdown-container">
          <label htmlFor="name" className="dropdown-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="dropdown-container">
          <label htmlFor="regno" className="dropdown-label">
            Registration Number
          </label>
          <input
            type="text"
            id="regno"
            name="regno"
            value={formData.regno}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="dropdown-container">
          <label htmlFor="email" className="dropdown-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="dropdown-container">
          <label htmlFor="mobile" className="dropdown-label">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="dropdown-container">
          <label htmlFor="university" className="dropdown-label">
            Select Your University:
          </label>
          <select
            id="university"
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

        <div className="dropdown-container">
          <label htmlFor="option" className="dropdown-label">
            Select Registration Type:
          </label>
          <select
            id="option"
            name="option"
            value={formData.option}
            onChange={handleChange}
            required
            className="register-dropdown"
          >
            <option value="Hackathon + Talk Show">Hackathon + Talk Show</option>
            <option value="Talk Show Only">Talk Show Only</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Submit & Pay
        </button>
      </form>

      {/* Popup (Modal) */}
      {showPopup && (
        <div
          className={`popup-overlay ${
            popupType === "success" ? "popup-success" : "popup-error"
          }`}
        >
          <div className="popup-content">
            {popupType === "success" ? (
              <h2>Congratulations!</h2>
            ) : (
              <h2>Oops!</h2>
            )}
            <p>{popupMessage}</p>
            <button onClick={closePopup} className="popup-close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;

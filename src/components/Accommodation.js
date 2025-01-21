import React from 'react';
import './Accommodation.css';

const Accommodation = () => {
  return (
    <div className="accommodation-container">
      {/* Header Section */}
      <header className="accommodation-header">
        <h1>Accommodation</h1>
        <p>
          Make your Chem-A-Thon experience seamless and comfortable. We provide
          affordable and secure accommodation for all participants.
        </p>
      </header>

      {/* Steps Section */}
      <section className="accommodation-steps">
        <h2>Steps to Avail Accommodation</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">1️⃣</div>
            <h3>Register</h3>
            <p>
              Register for Chem-A-Thon 5.0 to unlock access to the accommodation
              booking page.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">2️⃣</div>
            <h3>Choose Package</h3>
            <p>
              Select from multiple accommodation options suited to your
              requirements and budget.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">3️⃣</div>
            <h3>Book Your Stay</h3>
            <p>
              Complete your booking through our secure payment gateway and
              receive a confirmation email.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="accommodation-pricing">
        <h2>Pricing</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Basic</h3>
            <p>₹500 / night</p>
            <ul>
              <li>Shared dormitory</li>
              <li>Basic amenities</li>
              <li>Common bathrooms</li>
            </ul>
          </div>
          <div className="pricing-card">
            <h3>Standard</h3>
            <p>₹800 / night</p>
            <ul>
              <li>Shared room (2-3 people)</li>
              <li>Private bathroom</li>
              <li>Free Wi-Fi</li>
            </ul>
          </div>
          <div className="pricing-card">
            <h3>Premium</h3>
            <p>₹1200 / night</p>
            <ul>
              <li>Private room</li>
              <li>All premium amenities</li>
              <li>24/7 support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="accommodation-faqs">
        <h2>FAQs</h2>
        <div className="faq-item">
          <h3>What documents are required during check-in?</h3>
          <p>Valid ID proof (Aadhar, Passport, or College ID) is mandatory.</p>
        </div>
        <div className="faq-item">
          <h3>Can I cancel my booking?</h3>
          <p>
            Yes, cancellations are allowed up to 48 hours before check-in. Refund policies apply.
          </p>
        </div>
        <div className="faq-item">
          <h3>What facilities are included?</h3>
          <p>Basic amenities, free Wi-Fi, and clean bedding are included in all packages.</p>
        </div>
      </section>
    </div>
  );
};

export default Accommodation;

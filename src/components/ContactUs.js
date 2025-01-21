import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <section id="contact" className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-details">
        <div className="contact-card">
          <h3>Mr. Aarya Sinha</h3>
          <p><em>Chairperson</em></p>
          <a href="tel:+9177028527109" className="contact-link">+91 77028 527109</a>
        </div>
        <div className="contact-card">
          <h3>Ms. Smrti K</h3>
          <p><em>Vice Chairperson</em></p>
          <a href="tel:+917871718625" className="contact-link">+91 78717 18625</a>
        </div>
        <div className="contact-card">
          <h3>Mr. Neil Chheda</h3>
          <p><em>Finance Head</em></p>
          <a href="tel:+919930040135" className="contact-link">+91 99300 40135</a>
        </div>
        <div className="contact-card email">
          <h3>Email</h3>
          <a href="mailto:aichevit@gmail.com" className="contact-link">aichevit@gmail.com</a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

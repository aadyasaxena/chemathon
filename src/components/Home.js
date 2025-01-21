import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({});

  // Function to calculate time left
  const calculateTimeLeft = () => {
    const eventDate = new Date("February 15, 2025 09:00:00").getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    let time = {};
    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return time;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Chem-A-Thon 6.0</h1>
          <p>Experience the thrill of a 36-hour chemical engineering hackathon!</p>
          <a href="#register" className="cta-button">Register Now</a>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="countdown">
        <h2>Event Starts In:</h2>
        <div className="time-container">
          <div className="time-box">
            <span>{timeLeft.days || 0}</span>
            <p>Days</p>
          </div>
          <div className="time-box">
            <span>{timeLeft.hours || 0}</span>
            <p>Hours</p>
          </div>
          <div className="time-box">
            <span>{timeLeft.minutes || 0}</span>
            <p>Minutes</p>
          </div>
          <div className="time-box">
            <span>{timeLeft.seconds || 0}</span>
            <p>Seconds</p>
          </div>
        </div>
      </div>

      {/* Additional Event Description */}
      <div className="event-description">
      </div>
    </div>
  );
};

export default Home;

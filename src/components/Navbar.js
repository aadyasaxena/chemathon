import React, { useState } from 'react';
import './Navbar.css';

import aicheLogo from '/Users/aadyasaxena/.vscode/my-new-website/src/assets/images/AIChE_2024_Gala.webp';
import vitLogo from '/Users/aadyasaxena/.vscode/my-new-website/src/assets/images/image-removebg-preview.png';

const Navbar = () => {
  const [showSchedule, setShowSchedule] = useState(false);

  const toggleScheduleDropdown = () => {
    setShowSchedule(prevState => !prevState);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo-left">
          <img src={vitLogo} alt="VIT Logo" className="logo-left" />
        </div>

        <div className="navbar-title">
          Chem-A-Thon 6.0
        </div>

        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#register">Register</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#accommodation">Accommodation</a></li>
          <li className="schedule" onClick={toggleScheduleDropdown}>
            Event Schedule
            {showSchedule && (
              <ul className="schedule-dropdown">
                <li><a href="#day1">Day 1: Intro to Chem-A-Thon</a></li>
                <li><a href="#day2">Day 2: Workshops</a></li>
                <li><a href="#day3">Day 3: Competitions</a></li>
                <li><a href="#day4">Day 4: Closing Ceremony</a></li>
              </ul>
            )}
          </li>
        </ul>

        <div className="navbar-logo-right">
          <img src={aicheLogo} alt="AIChE Logo" className="logo-right" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

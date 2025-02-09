import React, { useState, useEffect } from "react";
import "./About.css";
import slide1 from "../../assets/images/4.jpeg";
import slide2 from "../../assets/images/2.jpeg";
import slide3 from "../../assets/images/3.jpeg";

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [slide1, slide2, slide3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="about-container">
      <div
        className="background-overlay"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      ></div>
      <div className="content-wrapper">
        <h2 className="about-title">About Chem-A-Thon 6.0</h2>
        <div className="about-content">
          <p>
            Chem-A-Thon is an annual 36-hour hackathon where students design
            working models to solve real-world challenges in Chemical
            Engineering. This competition brings together undergraduates from
            universities across Asia, fostering innovation, collaboration, and
            industry interaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

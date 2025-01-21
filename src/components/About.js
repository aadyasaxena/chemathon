import React, { useEffect, useState } from 'react';
import './About.css';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/Users/aadyasaxena/.vscode/my-new-website/src/assets/images/4.jpeg',
    'path/to/image2.jpg',
    'path/to/image3.jpg',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [slides.length]); // Include slides.length in the dependency array

  return (
    <section id="about" className="about-container">
      <div className="background-slideshow">
        {slides.map((image, index) => (
          <div
            key={index}
            className={`background-slide ${index === currentSlide ? 'active-slide' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className="content-wrapper">
        <h2 className="about-title">About Chem-A-Thon 6.0</h2>
        <div className="about-content">
          <p>
            Chem-A-Thon is an annual 36-hour hackathon where students design working models to solve real-world challenges in Chemical Engineering. This competition brings together undergraduates from universities across Asia, fostering innovation, collaboration, and industry interaction.
          </p>
          <div className="highlights">
            <ul>
              <li><b>36 Hours</b> of non-stop brainstorming and innovation</li>
              <li><b>3 Checkpoints</b> with expert mentor guidance</li>
              <li><b>Open to Students</b> across Asia</li>
            </ul>
          </div>
        </div>
        <div className="molecule-image">
          <img src="/path-to-molecule-image.png" alt="molecule" />
        </div>
      </div>
    </section>
  );
};

export default About;
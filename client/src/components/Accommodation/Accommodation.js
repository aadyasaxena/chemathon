import React, { useState, useEffect } from "react";
import "./Accommodation.css";

const Accommodation = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5500/accommodationRouter/accommodations"
        );
        if (response.ok) {
          const data = await response.json();
          setAccommodations(data);
        } else {
          console.error("Failed to fetch accommodations");
        }
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };
    fetchAccommodations();
  }, []);

  const handleBookAccommodation = async (accommodation) => {
    try {
      const response = await fetch(
        "http://localhost:5500/accommodationRouter/book-accommodation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: accommodation.name,
            description: accommodation.description,
            price: accommodation.price,
            requireAccomodation: true,
          }),
        }
      );
      if (response.ok) {
        alert(`Accommodation "${accommodation.name}" booked successfully!`);
      } else {
        alert("Failed to book accommodation. Please try again.");
      }
    } catch (error) {
      console.error("Error booking accommodation:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="accommodation-container" id="Accommodation">
      <h2>Accommodation Booking</h2>
      <p>
        Register for Chem-A-Thon 5.0 to unlock access to the accommodation
        booking page.
      </p>
      <p>
        Select from multiple accommodation options suited to your requirements
        and budget.
      </p>
      <p>
        Complete your booking through our secure payment gateway and receive a
        confirmation email.
      </p>

      <div className="accommodation-options">
        {accommodations.map((accommodation, index) => (
          <div key={index} className="accommodation-card">
            <h3>{accommodation.name}</h3>
            <p>{accommodation.description}</p>
            <p>₹{accommodation.price} / night</p>
            <button onClick={() => handleBookAccommodation(accommodation)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;

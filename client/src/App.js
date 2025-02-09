import React from "react";
import Navbar from "./components/Landing/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Register from "./components/Register/RegistrationForm";
import Accommodation from "./components/Accommodation/Accommodation";
import ContactUs from "./components/Contact/ContactUs";
import Footer from "./components/Landing/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      {/* Add "id" attributes to enable navigation */}
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="register">
        <Register />
      </section>
      <section id="accomodation">
        <Accommodation />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <Footer />
    </div>
  );
};

export default App;

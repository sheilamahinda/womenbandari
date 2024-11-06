// src/HomePage.js

import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./HomePage.css";
import Testimonials from "./Testimonials"; // Import the Testimonials component
import Header from "./components/Header/Header";

function HomePage() {
  return (
    <div className="App">
      <Header />

      {/* <header>
        <nav className="navbar">
          <div className="logo">
            <img src="/glogo.png" alt="Native English Logo" />
          </div>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#courses">Courses</a>
            </li>
            <li>
              <Link to="/LoginPage">Profile/Dashboard</Link>
            </li>{" "}
          </ul>
          <button className="contact-btn">Contact</button>
        </nav>
      </header> */}

<section className="hero full-width">
        <h1>
          <span className="highlight-green">Empowering Women</span> <br />
          Towards Economic Equality and Leadership
        </h1>
        <p>Explore resources and connections to unlock new leadership potential and achieve economic independence.</p>
        <button className="cta-btn">Join Our Mission</button>
      </section>

      <section className="challenges-solutions full-width">
        <div className="column challenges">
          <h2>95%</h2>
          <p>Achieving economic independence.</p>
        </div>
        <div className="column solutions">
          <h2>96%</h2>
          <p>Leadership in the workplace.</p>
        </div>
        <div className="column solutions">
          <h2>98%</h2>
          <p>Connected with mentorship.</p>
        </div>
      </section>

      <section className="welcome">
        <h2>Welcome</h2>
        <p> Our platform is dedicated to fostering economic growth and leadership opportunities for women. We provide a comprehensive range of resources designed to equip women with essential skills, from career development and financial literacy to leadership strategies. Join our community to connect, collaborate, and grow with like-minded individuals who are equally passionate about achieving economic equality and driving positive change.</p>
      </section>

      <section className="standout full-width">
        <img src="/bwom.jpg" alt="Standout" />
        <div className="content">
          <h2>Discover More About Our Services</h2>
          <p>
          We support women's economic empowerment by connecting them to high-quality resources, mentorship programs, and leadership training. Our platform is designed to help women gain independence, build valuable skills, and achieve their financial goals.
          </p>
          <button className="learn-more-button">Learn More</button>
        </div>
      </section>

      {/* Testimonials Section: This comes right after Welcome */}
      <Testimonials />

      <section className="student-feedback">
        <h3>Student Feedback</h3>
        <div className="feedback-cards">
          <div className="feedback">
            <p>"This platform has connected me to mentorship opportunities I never imagined."</p>
            <h4>Jane Milwa</h4>
          </div>
          <div className="feedback">
            <p>"I’ve built confidence and leadership skills, transforming my career journey."</p>
            <h4>Eva Kamira</h4>
          </div>
        </div>
      </section>

      <section className="explore-courses">
        <h3>Explore our Courses</h3>
        <p>Access our comprehensive resources for skill-building, financial growth, and leadership.</p>
        <button className="explore-btn">Explore Now</button>
      </section>

      <footer>
        <div className="footer-content">
          <div className="subscribe-section">
            <h4>Subscribe to our Newsletter</h4>
            <input type="email" placeholder="Enter your email" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
          <div className="footer-links">
            <p>© 2024 Women’s Empowerment Platform. All rights reserved.</p>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

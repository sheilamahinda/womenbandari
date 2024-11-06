import React from "react";
import "../../SignUp.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="subscribe-section">
          <h4>Subscribe Newsletters</h4>
          <p>
            Stay updated with our latest courses and resources by subscribing to
            our newsletter.
          </p>
          <input type="email" placeholder="Enter Your Email" />
          <button className="subscribe-btn">SUBSCRIBE NOW</button>
        </div>
        <div className="footer-bottom">
          <ul className="footer-links">
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#disclaimer">Disclaimer</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
          </ul>
          <p>© 2024 Native English. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Conference.js (React)
import React from 'react';
import { Link } from 'react-router-dom';
import './Conference.css'; // A single CSS file for all components

// Sidebar Component
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/glogo.png" alt="Nativo English Logo" />
      </div>
      <ul className="sidebar-menu">
      <li><Link to="/dashboard">Dashboard</Link></li>
        <li className="menu-item">Courses</li>
        <li className="menu-item">Downloads</li>
        <li className="menu-item">Grade</li>
        <li className="menu-item">Teachers</li>
        <li className="menu-item">Payment</li>
        <li className="menu-item">Support Services</li>
        <li className="menu-item">Messages</li>
        <li className="menu-item">Conference Meeting</li>
      </ul>
      <button className="upgrade-button">Upgrade</button>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar">
      
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#courses">Courses</a></li>
        <li><Link to="/profile">Profile/Dashboard</Link></li>
      </ul>
      <button className="contact-btn">Contact</button>
    </nav>
  );
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Public Speaking Conference Meeting</h2>
        <p>9 Lessons, 6h 30min</p>
      </header>
      
      <div className="video-section">
        <img src="/ftf.jpg" alt="Video Conference" className="video-conference" />
      </div>
      
      <div className="course-contents">
        <h3>Course Contents</h3>
        <ul>
          <li>Get Started - 1 hour</li>
          <li>Everyday Conversations - 2h</li>
          <li>Business English - 3h</li>
          <li>Using Illustrator - 1 hour</li>
          <li>English for Specific Purposes - 5 lessons</li>
        </ul>
      </div>

      <div className="book-offer">
        <h3>Book for</h3>
        <p>All Benefits of Plus - $24</p>
      </div>
    </div>
  );
};

// Main Conference Component
const Conference = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Conference;

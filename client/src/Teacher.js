import React from 'react';
import './Teacher.css'; // Import the correct CSS file

const Teacher = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h1>Nativo English</h1>
        <ul>
          <li>Dashboard</li>
          <li>Courses</li>
          <li>Downloads</li>
          <li>Grade</li>
          <li>Teachers</li>
          <li>Payment</li>
          <li>Support Services</li>
          <li>Messages</li>
          <li>Conference Meeting</li>
        </ul>
        <button className="upgrade-btn">Upgrade</button>
      </aside>
      
      <main className="main-content">
        <nav className="navbar">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Courses</li>
            <li>Profile/Dashboard</li>
          </ul>
          <button className="contact-btn">Contact</button>
        </nav>

        <section className="profile-section">
          <div className="personal-details">
            <h2>Personal Details</h2>
            <div className="detail-item">
              <strong>Name:</strong> Ms. Emily
            </div>
            <div className="detail-item">
              <strong>Contact no:</strong> 98XXXXXX9
            </div>
            <div className="detail-item">
              <strong>Email:</strong> xyz@gmail.com
            </div>
            <div className="detail-item">
              <strong>Password:</strong> XXXXXXXXX
            </div>
          </div>

          <div className="profile-image">
            <img src="default-profile.png" alt="Profile" />
            <div className="designation">Assistant professor</div>
            <div className="registered-on">
              <strong>Registered on:</strong> 26 August, 2020
            </div>
          </div>
        </section>

        <section className="bio-section">
          <h2>Bio</h2>
          <p>
            Emily Johnson is a passionate and dedicated English instructor with over 10 years of teaching experience.
            She holds a Master's degree in English language and literature from the University of Cambridge and a TESOL certification.
            Emily has taught students of all ages and proficiency levels, from beginners to advanced learners, in both classroom settings and online platforms.
            Throughout her career, Emily has developed a reputation for her engaging teaching style and her ability to make complex grammar and vocabulary concepts accessible to students.
            She employs a variety of innovative methods, including multimedia resources, role-playing, and real-world connections, to ensure her students gain confidence and proficiency in English.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Teacher;

// src/CommunicationPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CommunicationPage.css'; // Custom CSS for this page

function CommunicationPage() {
  const [selectedUser, setSelectedUser] = useState('Jack Harrow');

  const users = [
    { name: 'Vali Dincer', status: 'Student' },
    { name: 'Theresa Webb', status: 'Student', active: true },
    { name: 'Eleanor Pena', status: 'Student' },
    { name: 'Jane Cooper', status: 'Student' },
    { name: 'Brooklyn Simmons', status: 'Student' },
    { name: 'Dianne Russell', status: 'Student' },
    { name: 'Floyd Miles', status: 'Student' },
  ];

  const messages = [
    { sender: 'Jack Harrow', text: 'Hi I have Some Queries regarding 2nd Chapter', time: '40 mins ago' },
    { sender: 'You', text: 'Sure, Let me know what is the issue?', time: '40 mins ago' },
    { sender: 'Jack Harrow', text: 'There?', time: 'Just now' },
  ];

  return (
    <div className="communication-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/glogo.png" alt="Native English Logo" />
        </div>
        <ul className="sidebar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
          <li>Courses</li>
          <li>Downloads</li>
          <li>Grade</li>
          <li>Teachers</li>
          <li>Payment</li>
          <li>Support Services</li>
          <li>Messages</li>
          <li>Conference Meeting</li>
        </ul>
        <div className="sidebar-upgrade">
          <button>Upgrade</button>
        </div>
      </aside>

      {/* Chat Section */}
      <div className="chat-section">
        <div className="user-list">
          <input type="text" placeholder="Search User" className="search-input" />
          {users.map((user, index) => (
            <div
              key={index}
              className={`user-item ${selectedUser === user.name ? 'selected' : ''}`}
              onClick={() => setSelectedUser(user.name)}
            >
              <span className="user-name">{user.name}</span>
              <span className="user-status">{user.status}</span>
              {user.active && <span className="user-active-dot"></span>}
            </div>
          ))}
        </div>

        <div className="chat-window">
          <div className="chat-header">
            <h3>{selectedUser}</h3>
            <div className="chat-actions">
              <button className="delete-btn">Delete</button>
              <button className="block-btn">Block</button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
                <p>{message.text}</p>
                <small>{message.time}</small>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button className="send-btn">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunicationPage;

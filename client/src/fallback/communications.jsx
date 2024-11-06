// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import io from "socket.io-client";
// import "./CommunicationPage.css";

// const socket = io.connect("http://localhost:4000");

// function CommunicationPage() {
//   const [selectedUser, setSelectedUser] = useState("Jack Harrow");
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState("");
//   const [users, setUsers] = useState([]);

//   // Handle incoming messages
//   useEffect(() => {
//     // Join the chat with a username (for demo purposes, hardcoded)
//     socket.emit("join", "You");

//     // Listen for incoming messages
//     socket.on("message", (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Listen for updates to the user list
//     socket.on("userList", (userList) => {
//       setUsers(userList);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (messageText.trim()) {
//       const newMessage = {
//         sender: "You",
//         text: messageText,
//         time: new Date().toLocaleTimeString(),
//       };
//       socket.emit("message", newMessage); // Send message to the server
//       setMessageText(""); // Clear input field
//     }
//   };

//   return (
//     <div className="communication-page">
//       <aside className="sidebar">
//         <div className="sidebar-logo">
//           <img src="/glogo.png" alt="Native English Logo" />
//         </div>
//         <ul className="sidebar-menu">
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//           <li>Courses</li>
//           <li>Downloads</li>
//           <li>Grade</li>
//           <li>Teachers</li>
//           <li>Payment</li>
//           <li>Support Services</li>
//           <li>Messages</li>
//           <li>Conference Meeting</li>
//         </ul>
//         <div className="sidebar-upgrade">
//           <button>Upgrade</button>
//         </div>
//       </aside>

//       <div className="chat-section">
//         <div className="user-list">
//           <input
//             type="text"
//             placeholder="Search User"
//             className="search-input"
//           />
//           {users.map((user, index) => (
//             <div
//               key={index}
//               className={`user-item ${selectedUser === user ? "selected" : ""}`}
//               onClick={() => setSelectedUser(user)}
//             >
//               <span className="user-name">{user}</span>
//               <span className="user-status">Active</span>
//             </div>
//           ))}
//         </div>

//         <div className="chat-window">
//           <div className="chat-header">
//             <h3>{selectedUser}</h3>
//             <div className="chat-actions">
//               <button className="delete-btn">Delete</button>
//               <button className="block-btn">Block</button>
//             </div>
//           </div>

//           <div className="chat-messages">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`message ${
//                   message.sender === "You" ? "sent" : "received"
//                 }`}
//               >
//                 <p>{message.text}</p>
//                 <small>{message.time}</small>
//               </div>
//             ))}
//           </div>

//           <div className="chat-input">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//             />
//             <button className="send-btn" onClick={sendMessage}>
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CommunicationPage;

import { useContext } from "react";
import { ElearningContext } from "./context/ElearningContext";

// Dashboard Component
export const Dashboard = () => {
  const { username, role } = useContext(ElearningContext);

  return (
    <div className="dashboard-content">
      <div className="dashboard-welcome">
        <h2>Welcome Back {username}</h2>
        <p>Here’s an overview of your course</p>
      </div>

      <div className="recent-courses">
        <div className="courses-list">
          <div className="profile-card">
            <div className="profile-image">
              <img
                src="/av.png"
                alt="Student Profile"
                className="profile-pic"
              />
            </div>
            <div className="profile-details">
              <h3>{username}</h3>
              <p>
              {username} is a passionate student interested in leveraging
                technology to address societal challenges. She is focused on
                using her tech skills to create solutions that make a positive
                impact in society.
              </p>
            </div>
          </div>
        </div>
      </div>

     {/* Mentorship and Leadership Opportunities Section */}
     <div className="mentorship-section">
        <h3>Mentorship & Leadership Opportunities</h3>
        <ul className="opportunities-list">
          <li>
            <strong>Leadership Workshop:</strong> Join us for a workshop focused on developing leadership skills tailored for women. <em>Next session: Nov 15, 2024</em>
          </li>
          <li>
            <strong>Mentorship Program:</strong> Connect with experienced mentors in your field. <em>Apply by: Nov 10, 2024</em>
          </li>
          <li>
            <strong>Networking Event:</strong> Participate in a networking event to meet like-minded women and industry leaders. <em>Date: Dec 5, 2024</em>
          </li>
          <li>
            <strong>Panel Discussion:</strong> Attend a panel discussion featuring successful women leaders sharing their journeys. <em>Date: Dec 10, 2024</em>
          </li>
        </ul>
      </div>

      <div className="daily-progress">
        {/* <h3>Daily progress</h3> */}
        <div className="progress-chart">
          {/* Insert chart here using any chart library like Chart.js */}
        </div>
      </div>
    </div>
  );
};

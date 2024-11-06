import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ServicesPage.css'; // Create a new CSS file for styles
import Testimonials from './Testimonials'; // Import Testimonials if needed
import Header from "./components/Header/Header";

function ServicesPage() {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "From Struggle to Success: Jane's Journey",
      content: "Jane overcame significant challenges to achieve her financial independence through careful budgeting and strategic investments.",
      category: "Entrepreneurship"
    },
    {
      id: 2,
      title: "Eva's Path to Leadership",
      content: "Eva shares how mentorship and skill-building helped her rise to a leadership position in her company.",
      category: "Career Advancement"
    },
    // Add more stories as needed
  ]);

  const handleSubmitStory = (newStory) => {
    setStories([...stories, newStory]);
  };

  return (
    <div className="App">
      <Header />

      <section className="hero full-width">
        <h1>
          <span className="highlight-green">Empowering Women</span> <br />
          Through Success Stories
        </h1>
        <p>Discover inspiring journeys of women who have achieved financial independence and leadership.</p>
      </section>

      <section id="services" className="services">
  <h2>Services Offered by Women Bandari</h2>

  {/* One-on-One Mentorship Section */}
  <div className="service-section alt-layout">
    <img src="/bwm.jpg" alt="Mentorship" className="service-image" />
    <div className="content">
      <h3>One-on-One Mentorship</h3>
      <p>
        Our one-on-one mentorship program connects you with experienced mentors dedicated to helping you succeed. These mentors provide personalized guidance tailored to your goals, ensuring you receive the support and insight needed to overcome challenges and unlock new opportunities. Whether you’re working on professional, financial, or personal growth, our mentors offer practical advice, encouragement, and expertise, helping you develop the skills and confidence needed to excel. This program fosters strong, supportive relationships, offering a safe space for learning and growth.
      </p>
    </div>
  </div>

  {/* Mentor Resources Section */}
  <div className="service-section">
    <img src="/bwm1.jpg" alt="Resources from Mentors" className="service-image" />
    <div className="content">
      <h3>Resources from Mentors</h3>
      <p>
        Access a rich library of resources handpicked by our mentors, including articles, videos, guides, and tools to aid your growth journey. These resources cover essential topics such as leadership development, financial planning, career advancement, and personal well-being. By receiving curated content from experts in your field, you can continuously learn and stay informed. This resource pool is designed to provide foundational knowledge and cutting-edge insights, empowering you to make informed decisions and implement effective strategies in your life and career.
      </p>
    </div>
  </div>

  {/* Budget Planner Section */}
  <div className="service-section alt-layout">
    <img src="/bwm2.jpg" alt="Budget Planner" className="service-image" />
    <div className="content">
      <h3>Budget Planner</h3>
      <p>
        Our Budget Planner is an intuitive tool that helps you organize your finances, set goals, and track expenses. Designed to simplify budgeting, it provides visualizations that make it easy to monitor your spending and see your progress toward financial independence. Whether you’re planning for everyday expenses or saving for future investments, the Budget Planner supports you in creating a sustainable financial plan. With the ability to adjust your budget in real-time, you gain valuable insights into your spending patterns and learn to make smarter financial choices.
      </p>
      
    </div>
  </div>

  {/* Leadership Skills Practice Section */}
  <div className="service-section">
    <img src="/bwm3.jpg" alt="Leadership Skills" className="service-image" />
    <div className="content">
      <h3>Leadership Skills Practice</h3>
      <p>
        Leadership skills are essential for making a positive impact, and our practical exercises provide a hands-on approach to building and refining these abilities. This section offers various simulations and scenarios that challenge you to think critically, communicate effectively, and make decisions confidently. By practicing real-life leadership situations, you can develop qualities like strategic thinking, empathy, and resilience. This immersive experience allows you to gain the skills and experience needed to lead teams, influence others, and drive change in your community and career.
      </p>
      
    </div>
  </div>

  {/* Progress Tracking Section */}
  <div className="service-section alt-layout">
    <img src="/bwm4.jpg" alt="Progress Tracking" className="service-image" />
    <div className="content">
      <h3>Progress Tracking</h3>
      <p>
        Track your growth and accomplishments with our Progress Tracking tool, designed to help you measure your development over time. This feature provides insights into your budgeting improvements, leadership skill advancements, and other areas you focus on. By setting milestones and regularly assessing your progress, you can stay motivated and see how your efforts are translating into tangible outcomes. Progress Tracking encourages you to celebrate achievements and identify areas for further growth, keeping you aligned with your personal and professional goals.
      </p>
    </div>
  </div>
</section>



      <section className="success-stories">
        <h2>Impactful Success Stories</h2>
        <div className="story-cards">
          {stories.map(story => (
            <div key={story.id} className="story-card">
              <h3>{story.title}</h3>
              <p>{story.content}</p>
              <p className="category">{story.category}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="user-submissions">
        <h2>Share Your Story</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const newStory = {
            id: stories.length + 1,
            title: e.target.title.value,
            content: e.target.content.value,
            category: e.target.category.value
          };
          handleSubmitStory(newStory);
          e.target.reset();
        }}>
          <input type="text" name="title" placeholder="Story Title" required />
          <textarea name="content" placeholder="Your Story" required />
          <input type="text" name="category" placeholder="Category" required />
          <button type="submit">Submit</button>
        </form>
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

export default ServicesPage;

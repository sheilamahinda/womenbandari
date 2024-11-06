// LeadershipPractice.js
import React, { useState } from 'react';
import './LeadershipPractice.css';

const LeadershipPractice = () => {
  // State for Goal Setting
  const [goals, setGoals] = useState([{ title: '', steps: '' }]);
  
  // State for Decision Making
  const [decision, setDecision] = useState('');
  const scenario = {
    question: "Your team is facing a tight deadline, but morale is low. What do you do?",
    options: [
      "Hold a team-building activity to motivate",
      "Assign more tasks to speed up work",
      "Discuss with the team to identify issues"
    ],
    correctAnswer: "Discuss with the team to identify issues"
  };
  const [decisionFeedback, setDecisionFeedback] = useState('');

  // State for Communication Practice
  const [communicationMessage, setCommunicationMessage] = useState('');
  const [communicationFeedback, setCommunicationFeedback] = useState('');

  // State for Feedback
  const [feedback, setFeedback] = useState('');

  // Handle Goal Setting
  const handleGoalChange = (index, field, value) => {
    const updatedGoals = [...goals];
    updatedGoals[index][field] = value;
    setGoals(updatedGoals);
  };

  const addGoal = () => setGoals([...goals, { title: '', steps: '' }]);

  // Handle Decision Making
  const handleDecision = (option) => {
    setDecision(option);
    setDecisionFeedback(option === scenario.correctAnswer ? "Great choice!" : "Consider other options.");
  };

  // Handle Communication Practice
  const handleCommunicationSubmit = () => {
    const feedback = communicationMessage.includes('positive') ? "Well-phrased!" : "Try a more supportive tone.";
    setCommunicationFeedback(feedback);
  };

  return (
    <div>
      <h2>Leadership Skills Practice</h2>

      {/* Goal Setting Section */}
      <div>
        <h3>Goal Setting</h3>
        {goals.map((goal, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Goal Title"
              value={goal.title}
              onChange={(e) => handleGoalChange(index, 'title', e.target.value)}
            />
            <input
              type="text"
              placeholder="Steps to Achieve Goal"
              value={goal.steps}
              onChange={(e) => handleGoalChange(index, 'steps', e.target.value)}
            />
          </div>
        ))}
        <button onClick={addGoal}>Add Another Goal</button>
      </div>

      <hr />

      {/* Decision-Making Section */}
      <div>
        <h3>Decision-Making Scenario</h3>
        <p>{scenario.question}</p>
        {scenario.options.map((option, index) => (
          <button key={index} onClick={() => handleDecision(option)}>{option}</button>
        ))}
        {decision && <p>{decisionFeedback}</p>}
      </div>

      <hr />

      {/* Communication Practice Section */}
      <div>
        <h3>Effective Communication Practice</h3>
        <textarea
          placeholder="Write a message to motivate your team..."
          value={communicationMessage}
          onChange={(e) => setCommunicationMessage(e.target.value)}
        />
        <button onClick={handleCommunicationSubmit}>Submit Message</button>
        {communicationFeedback && <p>{communicationFeedback}</p>}
      </div>

      <hr />

      {/* Feedback Section */}
      <div>
        <h3>Leadership Feedback</h3>
        <textarea
          placeholder="Provide your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <p>Thank you for your feedback: {feedback}</p>
      </div>
    </div>
  );
};

export default LeadershipPractice;

import React from 'react';
import './pdash.css';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

export const Grade = () => {
    const ProgressCard = ({ title, score }) => {
        return (
            <div className="progress-card"> 
                <h4>{title}</h4>
                <p className="score">{score}</p>
            </div>
        );
    };

    // Define the data for the LineChart
    const data = [
      { name: 'August', Financial: 60, Leadership: 70 },
      { name: 'September', Financial: 75, Leadership: 80 },
      { name: 'October', Financial: 85, Leadership: 90 },
      { name: 'November', Financial: 95, Leadership: 98 },
    ];

    return (
      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <p>Here’s an overview of your learning progress in Financial and Leadership Resources</p>
        </div>
        <div className="progress-section">
          <ProgressCard title="Completed Financial Lessons" score="75%" />
          <ProgressCard title="Completed Leadership Lessons" score="80%" />
          <ProgressCard title="Quiz Score: Financial" score="85%" />
          <ProgressCard title="Quiz Score: Leadership" score="90%" />
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Financial" stroke="#8884d8" name="Financial Progress" />
            <Line type="monotone" dataKey="Leadership" stroke="#82ca9d" name="Leadership Progress" />
          </LineChart>
        </ResponsiveContainer>

        <div className="daily-progress">
          <div className="progress-chart">
            {/* Insert any additional charts or visualizations here */}
          </div>
        </div>
      </div>
    );
};

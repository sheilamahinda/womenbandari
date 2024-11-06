import React, { useContext, useEffect, useState } from "react";
import "../../pdash.css";
import { ElearningContext } from "../../context/ElearningContext";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

import { AdminsGrade } from "./AdminGrade";
import axios from "axios";
import { Typography } from "@mui/material";
import { useIsPermitted } from "../../hooks/useIsPermitted";

export const Grade = () => {
  const { role, adm, updateLoading, processedGrade, setProcessedGrades } =
    useContext(ElearningContext);
  const [latestScores, setLatestScores] = useState({
    semester1: null,
    semester2: null,
  });

  const fetchGrades = async () => {
    try {
      updateLoading(true);
      const encodedAdm = encodeURIComponent(adm);
      const response = await axios.get(
        `http://localhost:3005/api/getGrade/${encodedAdm}`
      );
      let { grades } = response.data;

      // Determine the latest available scores for each semester
      const latestAvailableScores = getLatestScores(grades);
      setLatestScores(latestAvailableScores);

      setProcessedGrades((prev) => ({ ...prev, grades }));
      updateLoading(false);
    } catch (e) {
      updateLoading(false);
      console.error(e.message);
    }
  };

  const getLatestScores = (grades) => {
    let latestSemester1 = null;
    let latestSemester2 = null;

    ["yr4", "yr3", "yr2", "yr1"].forEach((year) => {
      if (!latestSemester1 && grades[year].semester1) {
        latestSemester1 = grades[year].semester1;
      }
      if (!latestSemester2 && grades[year].semester2) {
        latestSemester2 = grades[year].semester2;
      }
    });

    return { semester1: latestSemester1, semester2: latestSemester2 };
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const isPermitted = () => role === "admin" || role === "instructor";

  const ProgressCard = ({ title, score }) => (
    <div className="progress-card">
      <h4>{title}</h4>
      <p className="score">{score !== null ? score : "N/A"}</p>
    </div>
  );

  const { yr1, yr2, yr3, yr4 } = processedGrade.grades;

  // Define the data for the LineChart
  const data = [
    { name: "1st year", value: yr1?.semester1 },
    { name: "", value: yr1?.semester2 },
    { name: "2nd year", value: yr2?.semester1 },
    { name: "", value: yr2?.semester2 },
    { name: "3rd year", value: yr3?.semester1 },
    { name: "", value: yr3?.semester2 },
    { name: "4th year", value: yr4?.semester1 },
    { name: "", value: yr4?.semester2 },
  ];

  const toBeRendered = () => {
    if (latestScores.semester1) {
      return data;
    } else {
      return [];
    }
  };

  return (
    <div className="dashboard-content">
      {!useIsPermitted(role) ? (
        <>
          <div className="dashboard-welcome">
            <Typography variant="h4">{adm}</Typography>
            <p>Here’s an overview of your course</p>
          </div>
          <div className="progress-section">
            <ProgressCard
              title="Latest Semester 1"
              score={latestScores.semester1}
            />
            <ProgressCard
              title="Latest Semester 2"
              score={latestScores.semester2}
            />
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={toBeRendered()}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>

          <div className="daily-progress">
            <div className="progress-chart">
              {/* Insert chart here using any chart library like Chart.js */}
            </div>
          </div>
        </>
      ) : (
        /**admins page */
        <AdminsGrade />
      )}
    </div>
  );
};

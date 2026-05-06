import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ActivityContext } from "../contexts/ActivityContext";
import "../styles/Dashboard.css";
import { FiGrid } from "react-icons/fi";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const { logs } = useContext(ActivityContext);

  // Data
  const totalHospitals = 100;
  const activeHospitals = 75;
  const inactiveHospitals= 25;

  const chartData = [
    { name: "Active", value: activeHospitals },
    { name: "Inactive", value: inactiveHospitals }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  // Activities
  const activities = logs
    .slice(-5)
    .reverse()
    .map((log) => ({
      id: log.id,
      time: new Date(log.timestamp).toLocaleString(),
      description: `${log.hospital} - ${log.description}`
    }));

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header-section">
        <div className="dashboard-header-title">
          <h1>
            <FiGrid className="dashboard-header-icon" />
            Dashboard
          </h1>

          <button
            className="add-btn add-btn-below"
            onClick={() => navigate("/add-hospital")}
          >
            Add Hospital
          </button>
        </div>

        <div className="search-container">
          <div className="search-bar">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search by hospital name"
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="stats-section"> 
         <div className="stat-card">
          <h2 className="stat-number">{totalHospitals}</h2>
          <p className="stat-label">Registered Hospitals</p>
        </div>

        <div className="stat-card">
          <h2 className="stat-number">{activeHospitals}</h2>
          <p className="stat-label">Active Hospitals</p>
        </div>

        <div className="stat-card">
          <h2 className="stat-number">{inactiveHospitals}</h2>
          <p className="stat-label">Inactive Hospitals</p>
        </div>
      </section>

      {/* Chart */}
      <section className="stat-card">
        <h3 style={{ marginBottom: "10px" }}>Hospital Status Overview</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Activity */}
      <section className="activity-section">
        <div className="activity-header">
          <h2>Recent Activity</h2>
          <p>Last 5 Activities</p>
        </div>

        <div className="activity-timeline">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`activity-item ${
                index === 0 ? "latest" : ""
              }`}
            >
              <div className="activity-dot"></div>

              <div>
                <div className="activity-time">{activity.time}</div>
                <div className="activity-description">
                  {activity.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

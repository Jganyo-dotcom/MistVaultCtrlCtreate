import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ActivityContext } from "../contexts/ActivityContext";
import "../styles/Dashboard.css";
import { FiGrid } from "react-icons/fi";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const { logs } = useContext(ActivityContext);

  const handleStatClick = (filter) => {
    navigate(`/hospitals?filte=${filter}`);
  };

  const activities = logs
    .slice(-5)
    .reverse()
    .map((log) => ({
      id: log.id,
      time: new Date(log.timestamp).toLocaleString(),
      description: `${log.hospital} ${log.description}`
    }));

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header-section">
        <div>
          <h1 className="dashboard-title">
            <FiGrid /> Dashboard
          </h1>

          <button
            className="add-btn"
            onClick={() => navigate("/add-hospital")}
          >
            Add Hospital
          </button>
        </div>

        <div className="search-bar">
          <span>🔍</span>
          <input placeholder="Search by hospital name" />
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <StatCard
          value={100}
          label="Registered Hospitals"
          percent={100}
          gradient="blue"
          onClick={() => handleStatClick("all")}
        />

        <StatCard
          value={75}
          label="Active Hospitals"
          percent={75}
          gradient="green"
          onClick={() => handleStatClick("active")}
        />

        <StatCard
          value={25}
          label="Inactive Hospitals"
          percent={25}
          gradient="red"
          onClick={() => handleStatClick("inactive")}
        />
      </div>

      {/* ACTIVITY */}
      <div className="activity-section">
        <div className="activity-header">
          <h2>Recent Activity</h2>
          <p>Last 5 Activities</p>
        </div>

        <div 
          className="activity-timeline"
          onClick={() => navigate("/auditlogs")}
        >
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`activity-item ${index === 0 ? "latest" : ""}`}
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
      </div>

    </div>
  );
}

/* PREMIUM CARD */
function StatCard({ value, label, percent, gradient, onClick }) {

  const data = [
    { value: percent },
    { value: 100 - percent }
  ];

  const gradientMap = {
    blue: ["#3b82f6", "#60a5fa"],
    green: ["#22c55e", "#4ade80"],
    red: ["#ef4444", "#f87171"]
  };

  const colors = [gradientMap[gradient][0], "#eef2f7"];

  return (
    <div
      className={`stat-card premium${onClick ? " clickable" : ""}`}
      onClick={onClick}
    >

      <div className="donut-wrapper">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <defs>
              <linearGradient id={`grad-${gradient}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={gradientMap[gradient][0]} />
                <stop offset="100%" stopColor={gradientMap[gradient][1]} />
              </linearGradient>
            </defs>

            <Pie
              data={data}
              innerRadius={45}
              outerRadius={55}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              isAnimationActive={true}
              animationDuration={1000}
            >
              <Cell fill={`url(#grad-${gradient})`} />
              <Cell fill="#eef2f7" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h2 className="stat-number">{value}</h2>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default Dashboard;
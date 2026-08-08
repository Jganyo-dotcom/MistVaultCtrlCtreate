import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ActivityContext } from "../contexts/ActivityContext";
import "../styles/Dashboard.css";
import { FiGrid } from "react-icons/fi";
import Staff from "./AddStaff.jsx"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const { logs } = useContext(ActivityContext);
  const [counts, setCounts] = useState({ registered: 0, active: 0, inactive: 0 });

  const handleStatClick = (filter) => {
    navigate(`/hospitals?filter=${filter}`);
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // fetch hospitals the same way as Hospitals page
        const token = localStorage.getItem("authToken");
        const res = await fetch("https://medsec.onrender.com/api/get-hospitals", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch hospitals");

        const data = await res.json();
        const hs = data.hospitals || [];
        const registered = hs.length;
        const active = hs.filter((h) => h.active).length;
        const inactive = registered - active;
        setCounts({ registered, active, inactive });
      } catch (err) {
        console.error("Error fetching hospitals for dashboard:", err);
      }
    };
    fetchCounts();
  }, []);

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
          value={counts.registered}
          label="Registered Hospitals"
          percent={100}
          gradient="blue"
          onClick={() => handleStatClick("all")}
        />

        <StatCard
          value={counts.active}
          label="Active Hospitals"
          percent={counts.registered ? Math.round((counts.active / counts.registered) * 100) : 0}
          gradient="green"
          onClick={() => handleStatClick("active")}
        />

        <StatCard
          value={counts.inactive}
          label="Inactive Hospitals"
          percent={counts.registered ? Math.round((counts.inactive / counts.registered) * 100) : 0}
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
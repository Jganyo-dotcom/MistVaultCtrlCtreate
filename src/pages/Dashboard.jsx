import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const activities = [
    {
      id: 1,
      time: "5/05/2026 10:32am",
      description: "Sunrise Clinic updated a new staff",
      type: "update"
    },
    {
      id: 2,
      time: "5/05/2026 9:45am",
      description: "Audit Father (EMR Admin) delete Clean Health hospital due to incorrect hospital details",
      type: "delete"
    },
    {
      id: 3,
      time: "5/05/2026 9:40am",
      description: "System automated daily backup",
      type: "backup"
    },
    {
      id: 4,
      time: "5/05/2026 8:40am",
      description: "Wellheit Hospital was deactivated due to inactivity.",
      type: "deactivate"
    },
    {
      id: 5,
      time: "5/05/2026 8:00pm",
      description: "Tolu at Promise Land Hospital forget password",
      type: "password"
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header-section">
        <div className="dashboard-left">
          <h1>Dashboard</h1>
          <button className="add-btn" type="button" onClick={() => navigate("/add-hospital")}>Add Hospital</button>
        </div>
        <div className="search-bar">
          <i className="search-icon">🔍</i>
          <input
            type="text"
            placeholder="Search by hospital name"
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <section className="stats-section">
        {/* Registered Hospitals Card */}
        <div className="stat-card">
          <div className="stat-chart">
            <div className="donut-chart blue-donut">
              <div className="donut-value">5</div>
            </div>
          </div>
          <div className="stat-info">
            <h3>Registered Hospitals</h3>
          </div>
        </div>

        {/* Active Hospitals Card */}
        <div className="stat-card">
          <div className="stat-chart">
            <div className="donut-chart green-donut">
              <div className="donut-value">3</div>
            </div>
          </div>
          <div className="stat-info">
            <h3>Active Hospitals</h3>
          </div>
        </div>

        {/* Inactive Hospitals Card */}
        <div className="stat-card">
          <div className="stat-chart">
            <div className="donut-chart red-donut">
              <div className="donut-value">2</div>
            </div>
          </div>
          <div className="stat-info">
            <h3>Inactive Hospitals</h3>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="activity-section">
        <div className="activity-header">
          <h2>Recent Activity</h2>
          <p className="activity-subtitle">Last 5 Activities</p>
        </div>

        <div className="activity-timeline">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
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

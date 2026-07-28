import React from "react";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import "../styles/ItDashboard.css";

export default function ITDashboard() {
  return (
    <div className="layout">
      <Sidebar />

      <main className="main">
        {/* TOPBAR */}
        <div className="topbar">
          <h2>Dashboard</h2>

          <input
            className="search"
            placeholder="Search by name, role or department"
          />

          <div className="user">Akpan Samuel</div>
        </div>

        {/* BUTTON */}
        <button className="add-btn">+ Add New Staff</button>

        {/* STATS */}
        <div className="card">
          <h3>100 Staff</h3>

          <div className="stats">
            <div className="stat">
              <div className="circle green">45</div>
              <p>Active</p>
            </div>

            <div className="stat">
              <div className="circle red">30</div>
              <p>Inactive</p>
            </div>

            <div className="stat">
              <div className="circle orange">25</div>
              <p>Suspended</p>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="card">
          <h3>Recent Activity</h3>
          <p className="sub">Last 5 Activities</p>

          <ul className="activity">
            <li>
              <strong>5/05/2026 10:32am</strong>
              <span> RAD Simi uploaded patient chest xray</span>
            </li>
            <li>PHARM Bibi administered patient medication</li>
            <li>System automated daily backup</li>
            <li>WellNest Hospital was deactivated</li>
            <li>Tolu forgot password</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
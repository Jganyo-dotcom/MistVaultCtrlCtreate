import React from "react";
import Sidebar from "../components/sidebar.jsx";
import "../styles/ItDashboard.css";

export default function ITDashboard() {
  return (
    <div className="it-layout">
      <Sidebar />

      <main className="it-main">
        {/* TOPBAR */}
        <div className="it-topbar">
          <div className="it-topbar-title">
            <span className="it-topbar-icon">▦</span>
            <h2>Dashboard</h2>
          </div>

          <input
            className="it-search"
            placeholder="Search by device, ticket, or staff member"
          />
        </div>

        {/* BUTTON */}
        <button className="it-add-btn">+ New Support Ticket</button>

        {/* STATS */}
        <div className="it-card">
          <h3>System Status</h3>
          <hr className="it-divider" />

          <div className="it-stats">
            <div className="it-stat">
              <div className="it-ring it-ring-green">
                <span>18</span>
              </div>
              <p>Systems Online</p>
            </div>

            <div className="it-stat">
              <div className="it-ring it-ring-red">
                <span>3</span>
              </div>
              <p>Systems Down</p>
            </div>

            <div className="it-stat">
              <div className="it-ring it-ring-orange">
                <span>7</span>
              </div>
              <p>Open Tickets</p>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="it-card">
          <h3>Recent Activity</h3>
          <hr className="it-divider" />
          <p className="it-sub">Last 5 Activities</p>

          <ul className="it-activity">
            <li className="it-activity-item it-activity-latest">
              <span className="it-dot" />
              <div>
                <strong>5/05/2026 10:32am</strong>
                <p>Password reset request from Tolu</p>
              </div>
            </li>
            <li className="it-activity-item">
              <span className="it-dot" />
              <div>
                <strong>5/05/2026 9:45am</strong>
                <p>Server backup completed successfully</p>
              </div>
            </li>
            <li className="it-activity-item">
              <span className="it-dot" />
              <div>
                <strong>5/05/2026 9:40am</strong>
                <p>New device registered: Ward 4 workstation</p>
              </div>
            </li>
            <li className="it-activity-item">
              <span className="it-dot" />
              <div>
                <strong>5/05/2026 8:40am</strong>
                <p>Firewall rule updated by IT Admin</p>
              </div>
            </li>
            <li className="it-activity-item">
              <span className="it-dot" />
              <div>
                <strong>5/05/2026 8:00am</strong>
                <p>Login attempt flagged from unknown IP</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
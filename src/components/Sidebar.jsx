import React from "react";
import "../styles/Sidebar.css";

function Sidebar({ isOpen, onNavigate, currentPage }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">EMR</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div
          className={`nav-item ${currentPage === "dashboard" ? "active" : ""}`}
          onClick={() => onNavigate("dashboard")}
        >
          <i className="icon">📊</i>
          <span>Dashboard</span>
        </div>
        <div
          className={`nav-item ${currentPage === "hospitals" ? "active" : ""}`}
          onClick={() => onNavigate("hospitals")}
        >
          <i className="icon">🏥</i>
          <span>Hospitals</span>
        </div>
        <div
          className={`nav-item ${currentPage === "analytics" ? "active" : ""}`}
          onClick={() => onNavigate("analytics")}
        >
          <i className="icon">📈</i>
          <span>Analytics</span>
        </div>
        <div
          className={`nav-item ${currentPage === "auditlogs" ? "active" : ""}`}
          onClick={() => onNavigate("auditlogs")}
        >
          <i className="icon">📋</i>
          <span>Audit Logs</span>
        </div>
        <div
          className={`nav-item ${currentPage === "settings" ? "active" : ""}`}
          onClick={() => onNavigate("settings")}
        >
          <i className="icon">⚙️</i>
          <span>Settings</span>
        </div>
        <div className="nav-item logout" onClick={() => onNavigate("logout")}>
          <i className="icon">🚪</i>
          <span>Logout</span>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

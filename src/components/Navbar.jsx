import React from "react";
import "../styles/Navbar.css";

function Navbar({ userName = "Akpan Samuel" }) {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-actions">
          <div className="user-info">
            <span>{userName}</span>
          </div>
          <div className="user-profile">
            <i>👤</i>
          </div>
          <div className="notification-bell">
            <i>🔔</i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

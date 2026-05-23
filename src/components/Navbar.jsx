import { useState } from "react";
import { FiBell, FiUser, FiMenu } from "react-icons/fi";
import "../styles/Navbar.css";

export default function Navbar({ toggleSidebar, isMobile }) {
  const username = localStorage.getItem("username")
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "Sunrise Clinic sent an email",
    },
    {
      id: 2,
      message: "Amazing Grace Hospital is inactive",
    },
  ];

  return (
    <div className="navbar">
      {/* Hamburger */}
      {isMobile && <FiMenu className="menu-icon" onClick={toggleSidebar} />}

      {/* Right */}
      <div className="navbar-actions">
        {/* User */}
        <div className="user-info">
          <span>{username}</span>
          <FiUser className="icon" />
        </div>

        {/* Notification */}
        <div className="notification-wrapper">
          <FiBell
            className="icon bell-icon"
            onClick={() => setShowNotifications(!showNotifications)}
          />

          {/* Notification Badge */}
          <span className="notification-badge">{notifications.length}</span>

          {/* Dropdown */}
          {showNotifications && (
            <div className="notification-dropdown">
              <h4>Notifications</h4>

              {notifications.map((note) => (
                <div key={note.id} className="notification-item">
                  {note.message}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

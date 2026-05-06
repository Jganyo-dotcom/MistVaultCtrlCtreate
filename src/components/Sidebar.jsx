import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiBarChart2,
  FiClipboard,
  FiSettings,
  FiLogOut,
  FiX
} from "react-icons/fi";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar, closeSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("authenticated", "false");
    navigate("/signin");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="logo-icon">EMR</div>
        <button className="close-btn" onClick={toggleSidebar} title="Close sidebar">
          <FiX />
        </button>
      </div>

      <nav className="sidebar-nav" onClick={closeSidebar}>
        <NavLink to="/" className="nav-item">
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/hospitals" className="nav-item">
          <FiHome />
          <span>Hospitals</span>
        </NavLink>

        <NavLink to="/analytics" className="nav-item">
          <FiBarChart2 />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/auditlogs" className="nav-item">
          <FiClipboard />
          <span>Audit Logs</span>
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          <FiSettings />
          <span>Settings</span>
        </NavLink>

        <button onClick={handleLogout} className="nav-item logout">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
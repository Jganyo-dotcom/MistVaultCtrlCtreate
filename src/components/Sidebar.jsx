import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiBarChart2,
  FiClipboard,
  FiSettings,
  FiLogOut,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png";

export default function Sidebar({
  isOpen,
  toggleSidebar,
  closeSidebar,
  collapsed,
  toggleCollapse,
  isMobile
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("authenticated", "false");
    navigate("/signin");
  };

  const isCollapsed = isMobile ? false : collapsed;
  const isDesktop = !isMobile;

  return (
    <div
      className={`sidebar ${
        isMobile
         ? isOpen
           ? "open"
            : "closed"
           : collapsed
           ? "collapsed"
            : ""
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="sidebar-header">
        {/* LOGO */}
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          {!isCollapsed && <span className="logo-text">MIST</span>}
        </div>

        {/* BUTTONS */}
        <div className="sidebar-buttons">
          {!isMobile && (
            <button
              className="collapse-btn"
              onClick={toggleCollapse}
            >
              {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
          )}

          {isMobile && (
            <button className="close-btn" onClick={toggleSidebar}>
              <FiX />
            </button>
          )}
        </div>
      </div>

      {/* ================= NAV ================= */}
      <nav className="sidebar-nav" onClick={closeSidebar}>

        <NavLink to="/" className="nav-item">
          <FiGrid />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/hospitals" className="nav-item">
          <FiHome />
          {!isCollapsed && <span>Hospitals</span>}
        </NavLink>

        <NavLink to="/analytics" className="nav-item">
          <FiBarChart2 />
          {!isCollapsed && <span>Analytics</span>}
        </NavLink>

        <NavLink to="/auditlogs" className="nav-item">
          <FiClipboard />
          {!isCollapsed && <span>Audit Logs</span>}
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          <FiSettings />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>

        {/* LOGOUT */}
        <button onClick={handleLogout} className="nav-item logout">
          <FiLogOut />
          {!isCollapsed && <span>Logout</span>}
        </button>

      </nav>
    </div>
  );
}
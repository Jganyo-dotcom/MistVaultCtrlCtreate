// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FiHome,
//   FiGrid,
//   FiBarChart2,
//   FiClipboard,
//   FiSettings,
//   FiLogOut,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight
// } from "react-icons/fi";
// import "../styles/Sidebar.css";

// export default function Sidebar({
//   isOpen,
//   toggleSidebar,
//   closeSidebar,
//   collapsed,
//   toggleCollapse,
//   isMobile
// }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.setItem("authenticated", "false");
//     navigate("/signin");
//   };

//   return (
//     <div
//       className={`sidebar ${
//         isMobile ? (isOpen ? "open" : "closed") : collapsed ? "collapsed" : ""
//       }`}
//     >
//       <div className="sidebar-header">
//         {!collapsed && <div className="logo-icon">EMR</div>}
//         <div className="sidebar-buttons">
//           {!isMobile && (
//             <button
//               className="collapse-btn"
//               onClick={toggleCollapse}
//               title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//             >
//               {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
//             </button>
//           )}
//           {isMobile && (
//             <button
//               className="close-btn"
//               onClick={toggleSidebar}
//               title="Close sidebar"
//             >
//               <FiX />
//             </button>
//           )}
//         </div>
//       </div>

//       <nav className="sidebar-nav" onClick={closeSidebar}>
//         <NavLink to="/" className="nav-item">
//           <FiGrid />
//           {!collapsed && <span>Dashboard</span>}
//         </NavLink>

//         <NavLink to="/hospitals" className="nav-item">
//           <FiHome />
//           {!collapsed && <span>Hospitals</span>}
//         </NavLink>

//         <NavLink to="/analytics" className="nav-item">
//           <FiBarChart2 />
//           {!collapsed && <span>Analytics</span>}
//         </NavLink>

//         <NavLink to="/auditlogs" className="nav-item">
//           <FiClipboard />
//           {!collapsed && <span>Audit Logs</span>}
//         </NavLink>

//         <NavLink to="/settings" className="nav-item">
//           <FiSettings />
//           {!collapsed && <span>Settings</span>}
//         </NavLink>

//         <button onClick={handleLogout} className="nav-item logout">
//           <FiLogOut />
//           {!collapsed && <span>Logout</span>}
//         </button>
//       </nav>
//     </div>
//   );
// }

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
import logo from "../assets/logo.png"; // ✅ make sure this exists

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

  return (
    <div
      className={`sidebar ${
        isMobile ? (isOpen ? "open" : "closed") : collapsed ? "collapsed" : ""
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="sidebar-header">

        {/* LOGO */}
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          {!collapsed && <span className="logo-text">MIST</span>}
        </div>

        {/* BUTTONS */}
        <div className="sidebar-buttons">
          {!isMobile && (
            <button
              className="collapse-btn"
              onClick={toggleCollapse}
            >
              {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
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
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/hospitals" className="nav-item">
          <FiHome />
          {!collapsed && <span>Hospitals</span>}
        </NavLink>

        <NavLink to="/analytics" className="nav-item">
          <FiBarChart2 />
          {!collapsed && <span>Analytics</span>}
        </NavLink>

        <NavLink to="/auditlogs" className="nav-item">
          <FiClipboard />
          {!collapsed && <span>Audit Logs</span>}
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          <FiSettings />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        {/* LOGOUT */}
        <button onClick={handleLogout} className="nav-item logout">
          <FiLogOut />
          {!collapsed && <span>Logout</span>}
        </button>

      </nav>
    </div>
  );
}
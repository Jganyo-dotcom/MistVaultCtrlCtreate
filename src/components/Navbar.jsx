import { FiBell, FiUser, FiMenu } from "react-icons/fi";
import "../styles/Navbar.css";

export default function Navbar({ toggleSidebar, isMobile }) {
  return (
    <div className="navbar">
      {/* Hamburger - Only on Mobile */}
      {isMobile && (
        <FiMenu className="menu-icon" onClick={toggleSidebar} />
      )}

      {/* Right */}
      <div className="navbar-actions">
        <div className="user-info">
          <span>Akpan Samuel</span>
          <FiUser className="icon" />
        </div>

        <FiBell className="icon" />
      </div>
    </div>
  );
}
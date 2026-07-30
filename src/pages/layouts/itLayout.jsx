import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ItSidebar from "../../components/itSidebar"; // Capitalized import identifier
import Navbar from "../../components/Navbar";
import "../../styles/Layout.css";

export default function ItLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleSidebarCollapse = () => {
    // Corrected condition to allow collapsing desktop sidebar
    if (!isMobile) {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="layout">
      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div className="overlay" onClick={closeSidebar} />
      )}

      {/* Sidebar Component */}
      <ItSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebarCollapse}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <div
        className={`layout-main ${
          !isMobile && sidebarCollapsed ? "collapsed" : ""
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} isMobile={isMobile} />

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

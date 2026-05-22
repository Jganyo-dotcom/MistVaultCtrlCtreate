import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../styles/Layout.css";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };

    if (isMobile) {
      setSidebarCollapsed(false);
    } [isMobile];

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    if (isMobile)
    setSidebarCollapsed(prev => !prev);
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

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebarCollapse}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <div className={`layout-main ${!isMobile && sidebarCollapsed ? "collapsed" : ""}`}>
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

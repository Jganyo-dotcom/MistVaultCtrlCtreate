import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";
import Analytics from "./pages/Analytics";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("You have been logged out successfully!");
      // In a real app, you would clear auth tokens and redirect to login
      setCurrentPage("dashboard");
    }
  };

  const handleNavigate = (page) => {
    if (page === "logout") {
      handleLogout();
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "hospitals":
        return <Hospitals />;
      case "analytics":
        return <Analytics />;
      case "auditlogs":
        return <AuditLogs />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar
        isOpen={sidebarOpen}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      <main className="main-content">
        <Navbar userName="Akpan Samuel" />
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
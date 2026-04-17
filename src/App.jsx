import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AppRoutes from "./Routes/AppRoutes";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname === "/" ? "dashboard" : location.pathname.slice(1);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("You have been logged out successfully!");
      localStorage.removeItem("authenticated");
      navigate("/signin");
    }
  };

  const handleNavigate = (page) => {
    if (page === "logout") {
      handleLogout();
      return;
    }

    const destination = page === "dashboard" ? "/dashboard" : `/${page}`;
    navigate(destination);
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
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
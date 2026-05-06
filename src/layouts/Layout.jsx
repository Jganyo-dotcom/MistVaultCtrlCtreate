import { useState } from "react";
import { Outlet } from "react-router-dom"; // To render child routes
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Main Content */}
      <div className={`main-content ${isOpen ? "shifted" : "full"}`}>
        {/* Navbar with toggle functionality */}
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

        {/* Renders the page content dynamically */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
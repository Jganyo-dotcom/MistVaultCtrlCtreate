import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Hospitals from "../pages/Hospitals";
import Analytics from "../pages/Analytics";
import AuditLogs from "../pages/AuditLogs";
import Settings from "../pages/Settings";
import Add from "../pages/Add";
import SignIn from "../pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/auditlogs" element={<AuditLogs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add-hospital" element={<Add />} />
      </Route>

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default AppRoutes;

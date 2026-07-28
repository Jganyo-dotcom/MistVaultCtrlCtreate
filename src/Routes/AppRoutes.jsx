import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../pages/layouts/Layout";
import Dashboard from "../pages/Dashboard";
import Hospitals from "../pages/Hospitals";
import Analytics from "../pages/Analytics";
import AuditLogs from "../pages/AuditLogs";
import Settings from "../pages/Settings";
import Add from "../pages/Add";
import SignIn from "../pages/SignIn";
import SignIn2 from "../pages/signin2"
import HospitalDetails from "../pages/HospitalDetails";
import { AddHospital } from "../pages/AddHospital";
import ProtectedRoute from "./ProtectedRoute";
import MistLanding from "../pages/MistLanding";
import ITDashboard from "../pages/ItDashboard"


function AppRoutes() {
  return (
    <Routes>

      {/* ✅ LANDING PAGE FIRST */}
      <Route path="/" element={<MistLanding />} />

      {/* Public */}
      <Route path="/signin" element={<SignIn />} />
      {/* Public */}
      <Route path="/signinStaff" element={<SignIn2 />} />


      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/add-hospital" element={<AddHospital />} />
        <Route path="/ITDashboard" element={<ITDashboard />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/auditlogs" element={<AuditLogs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add" element={<Add />} />
          <Route path="/hospitals/:id" element={<HospitalDetails />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default AppRoutes;
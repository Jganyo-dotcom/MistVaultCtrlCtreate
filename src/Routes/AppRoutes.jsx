import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../pages/layouts/Layout";
import ItLayout from "../pages/layouts/itLayout";
import Dashboard from "../pages/Dashboard";
import Hospitals from "../pages/Hospitals";
import Analytics from "../pages/Analytics";
import AuditLogs from "../pages/AuditLogs";
import Settings from "../pages/Settings";
import Add from "../pages/Add";
import SignIn from "../pages/SignIn";
import SignIn2 from "../pages/signin2";
import HospitalDetails from "../pages/HospitalDetails";
import { AddHospital } from "../pages/AddHospital";
import ProtectedRoute from "./ProtectedRoute";
import MistLanding from "../pages/MistLanding";
import ITDashboard from "../pages/ItDashboard";
import ITStaff from "../pages/ItStaff";
import StaffDetails from "../pages/StaffDetails";
import Activity from "../pages/Activity";
import Control from "../pages/Control";

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
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<ItLayout />}>
          <Route path="/ITDashboard" element={<ITDashboard />} />
          <Route path="/ITStaff" element={<ITStaff />} />
          <Route path="/staff/:id" element={<StaffDetails />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/Control" element={<Control />} />
        </Route>
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

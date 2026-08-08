import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../assets/logo.png";
import { BaseApi } from "../components/apiEndpoint";
import "./AddStaff.css";

const ROLES = [
  "Receptionist",
  "Doctor",
  "Nurse",
  "Lab Attendant",
  "Radiologist",
  "Pharmacist",
  "IT Staff",
];

// Predefined list of standard hospital departments
export const HOSPITAL_DEPARTMENTS = [
  "Emergency / Trauma",
  "Cardiology",
  "Radiology & Imaging",
  "Pediatrics",
  "Oncology",
  "Neurology",
  "Orthopedics",
  "Intensive Care Unit (ICU)",
  "Obstetrics & Gynecology (OB/GYN)",
  "Pathology & Laboratory",
  "Pharmacy",
  "Outpatient Department (OPD)",
  "General Surgery",
  "Administration & IT",
  "Psychiatry & Mental Health",
  "Physical Therapy & Rehabilitation",
  "Other / Custom",
];

export default function AddStaffRoleModal({ onClose, onRegister }) {
  const [step, setStep] = useState("role"); // "role" | "register"
  const [selectedRole, setSelectedRole] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    staffId: "",
    department: "",
    customDepartment: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // API request states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setStep("register");
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Determine final department string
    const finalDepartment =
      form.department === "Other / Custom"
        ? form.customDepartment.trim()
        : form.department;

    if (!finalDepartment) {
      setError("Please select or enter a valid department.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      // Payload aligned with backend expectations
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.contact,
        staffID: form.staffId,
        department: finalDepartment,
        role: selectedRole,
        password: form.password,
      };

      const response = await fetch(`${BaseApi}/accountStaff/register-staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register staff.");
      }

      if (onRegister) {
        onRegister(data.staff);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-modal-overlay" onClick={onClose}>
      <div className="role-modal-bg-circle circle-top" />
      <div className="role-modal-bg-circle circle-bottom" />

      {step === "role" && (
        <div className="role-modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="role-modal-logo">
            <img src={logo} alt="MIST logo" />
            <h2>MIST</h2>
            <p>Medical Information Storage Technology</p>
          </div>

          <div className="role-list">
            {ROLES.map((role) => (
              <button
                key={role}
                className="role-option"
                onClick={() => handleRoleClick(role)}
              >
                <span className="role-radio" />
                {role}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "register" && (
        <div className="register-card" onClick={(e) => e.stopPropagation()}>
          <div className="role-modal-logo">
            <img src={logo} alt="MIST logo" />
            <h2>MIST</h2>
            <p>Medical Information Storage Technology</p>
          </div>

          <h3 className="register-heading">
            Register New Staff ({selectedRole})
          </h3>

          {error && (
            <div
              className="register-error"
              style={{
                color: "#d9534f",
                backgroundColor: "#fdf7f7",
                padding: "8px 12px",
                borderRadius: "4px",
                marginBottom: "12px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="register-grid">
              <div className="field">
                <label>First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  required
                />
              </div>

              <div className="field">
                <label>Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  required
                />
              </div>

              <div className="field">
                <label>Official Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>

              <div className="field">
                <label>Official Contact</label>
                <input
                  type="tel"
                  value={form.contact}
                  onChange={handleChange("contact")}
                  required
                />
              </div>

              <div className="field">
                <label>Staff ID</label>
                <input
                  type="text"
                  value={form.staffId}
                  onChange={handleChange("staffId")}
                  required
                />
              </div>

              {/* Department Dropdown */}
              <div className="field">
                <label>Department</label>
                <select
                  value={form.department}
                  onChange={handleChange("department")}
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {HOSPITAL_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Department Input Field (Conditionally Rendered) */}
              {form.department === "Other / Custom" && (
                <div className="field field-full">
                  <label>Enter Custom Department Name</label>
                  <input
                    type="text"
                    value={form.customDepartment}
                    onChange={handleChange("customDepartment")}
                    placeholder="e.g. Endoscopy & Colonoscopy"
                    required
                  />
                </div>
              )}

              <div className="field">
                <label>Password</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange("password")}
                    required
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>

              <div className="field">
                <label>Confirm Password</label>
                <div className="password-field">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    required
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    {showConfirm ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

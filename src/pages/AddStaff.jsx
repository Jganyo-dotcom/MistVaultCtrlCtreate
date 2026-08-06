import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../assets/logo.png";
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

export default function AddStaffRoleModal({ onClose, onRegister }) {
    const [step, setStep] = useState("role"); // "role" | "register"
    const [selectedRole, setSelectedRole] = useState(null);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        staffId: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleRoleClick = (role) => {
        setSelectedRole(role);
        setStep("register");
    };

    const handleChange = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        if (onRegister) {
            onRegister({ ...form, role: selectedRole });
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

                    <h3 className="register-heading">Register New Staff</h3>

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
                            <div className="field field-full">
                                <label>Staff ID</label>
                                <input
                                    type="text"
                                    value={form.staffId}
                                    onChange={handleChange("staffId")}
                                    required
                                />
                            </div>

                            <div></div>

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

                        <button type="submit" className="register-btn">
                            Register
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
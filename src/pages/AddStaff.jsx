import React, { useState } from "react";
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

export default function AddStaffRoleModal({ onClose, onContinue }) {
    const [selectedRole, setSelectedRole] = useState("Receptionist");

    return (
        <div className="role-modal-overlay" onClick={onClose}>
            <div className="role-modal-bg-circle circle-top" />
            <div className="role-modal-bg-circle circle-bottom" />

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
                            className={`role-option ${selectedRole === role ? "role-selected" : ""}`}
                            onClick={() => setSelectedRole(role)}
                        >
                            <span className="role-radio">
                                {selectedRole === role && <span className="role-radio-dot" />}
                            </span>
                            {role}
                        </button>
                    ))}
                </div>


            </div>
        </div>
    );
}
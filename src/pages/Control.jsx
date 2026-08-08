import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { FiUserX, FiCheckCircle, FiKey, FiLock } from "react-icons/fi";
import "./Control.css";

const PERMISSIONS = [
    { role: "Doctor", icon: "🩺", level: "Full Access", users: 22 },
    { role: "Nurse", icon: "💉", level: "Limited Access", users: 20 },
    { role: "Pharmacist", icon: "💊", level: "Restricted Access", users: 8 },
    { role: "Lab Attendant", icon: "🧪", level: "Limited Access", users: 12 },
    { role: "Radiologist", icon: "🩻", level: "Limited Access", users: 5 },
    { role: "Receptionist", icon: "💼", level: "Restricted Access", users: 10 },
    { role: "IT Staff", icon: "👥", level: "Limited Access", users: 16 },
];

function levelClass(level) {
    if (level === "Full Access") return "level-full";
    if (level === "Restricted Access") return "level-restricted";
    return "level-limited";
}

export default function Control() {
    const [twoFA, setTwoFA] = useState(true);
    const [passwordPolicy, setPasswordPolicy] = useState(true);
    const [sessionTimeout, setSessionTimeout] = useState("30 minutes");
    const [lockoutAttempts, setLockoutAttempts] = useState("5 attempts");

    return (
        <div className="control-layout">
       
            <main className="control-main">
                <div className="control-topbar">
                    <div className="control-topbar-title">
                        <span className="control-topbar-icon">🪪</span>
                        <h2>Control</h2>
                    </div>
                    <button className="backup-btn">Last Backup: Today</button>
                </div>

                <div className="control-grid">
                    {/* ACCESS PERMISSIONS */}
                    <section className="control-card">
                        <h3 className="card-title">Access Permissions</h3>
                        <p className="card-subtitle">Manage permission for system users.</p>

                        <table className="permissions-table">
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Access Level</th>
                                    <th>Users</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PERMISSIONS.map((p) => (
                                    <tr key={p.role}>
                                        <td className="role-cell">
                                            <span className="role-icon">{p.icon}</span> {p.role}
                                        </td>
                                        <td>
                                            <span className={`level-badge ${levelClass(p.level)}`}>
                                                {p.level}
                                            </span>
                                        </td>
                                        <td className="users-cell">{p.users}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button className="view-all-btn">View all permissions.</button>
                    </section>

                    {/* SECURITY SETTINGS */}
                    <section className="control-card">
                        <h3 className="card-title">Security Settings</h3>
                        <p className="card-subtitle">Configure system security preferences.</p>

                        <div className="setting-row">
                            <div className="setting-icon">🛡️</div>
                            <div className="setting-text">
                                <h4>Two-Factor Authentication [2FA]</h4>
                                <p>Require 2FA every month and after 1 month of inactivity</p>
                            </div>
                            <button
                                className={`toggle ${twoFA ? "toggle-on" : ""}`}
                                onClick={() => setTwoFA((v) => !v)}
                            >
                                <span className="toggle-knob" />
                            </button>
                        </div>

                        <div className="setting-row">
                            <div className="setting-icon">🔒</div>
                            <div className="setting-text">
                                <h4>Password Policy</h4>
                                <p>Require strong passwords</p>
                            </div>
                            <button
                                className={`toggle ${passwordPolicy ? "toggle-on" : ""}`}
                                onClick={() => setPasswordPolicy((v) => !v)}
                            >
                                <span className="toggle-knob" />
                            </button>
                        </div>

                        <div className="setting-row">
                            <div className="setting-icon">🕒</div>
                            <div className="setting-text">
                                <h4>Session Timeout</h4>
                                <p>Automatically log out inactive users</p>
                            </div>
                            <select
                                className="setting-select"
                                value={sessionTimeout}
                                onChange={(e) => setSessionTimeout(e.target.value)}
                            >
                                <option>15 minutes</option>
                                <option>30 minutes</option>
                                <option>60 minutes</option>
                            </select>
                        </div>

                        <div className="setting-row">
                            <div className="setting-icon">🚫</div>
                            <div className="setting-text">
                                <h4>Account Lockout</h4>
                                <p>Lock account after failed login attempts</p>
                            </div>
                            <select
                                className="setting-select"
                                value={lockoutAttempts}
                                onChange={(e) => setLockoutAttempts(e.target.value)}
                            >
                                <option>3 attempts</option>
                                <option>5 attempts</option>
                                <option>10 attempts</option>
                            </select>
                        </div>
                    </section>
                </div>

                {/* SYSTEM CONTROLS */}
                <section className="control-card system-controls-card">
                    <h3 className="card-title">System Controls</h3>
                    <p className="card-subtitle">Perform system management actions.</p>

                    <div className="system-actions">
                        <button className="system-action">
                            <span className="action-icon icon-red">
                                <FiUserX />
                            </span>
                            <strong>Suspend Account</strong>
                            <p>Temporarily suspend a user account</p>
                        </button>

                        <button className="system-action">
                            <span className="action-icon icon-green">
                                <FiCheckCircle />
                            </span>
                            <strong>Reactivate Account</strong>
                            <p>Reactivate a suspended user account</p>
                        </button>

                        <button className="system-action">
                            <span className="action-icon icon-orange">
                                <FiKey />
                            </span>
                            <strong>Reset Password</strong>
                            <p>Reset password for one or multiple users</p>
                        </button>

                        <button className="system-action">
                            <span className="action-icon icon-purple">
                                <FiLock />
                            </span>
                            <strong>Lock Account</strong>
                            <p>Lock accounts that have been inactive</p>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
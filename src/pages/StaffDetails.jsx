import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar.jsx";
import STAFF_DATA from "../data/staffData.js";
import "./StaffDetails.css";

function initials(name) {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export default function StaffDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const staff = STAFF_DATA.find((s) => s.id === id);

    if (!staff) {
        return (
            <div className="staff-details-layout">
                <main className="staff-details-main">
                    <p>Staff member not found.</p>
                    <button onClick={() => navigate("/staff")}>‹ Back to Staff</button>
                </main>
            </div>
        );
    }

    return (
        <div className="staff-details-layout">
            <Sidebar />

            <main className="staff-details-main">
                <div className="details-topbar">
                    <h2 className="details-title">
                        <span className="details-icon">👤</span> Staff/Details
                    </h2>
                    <button className="back-btn" onClick={() => navigate("/staff")}>
                        ‹ Back
                    </button>
                </div>

                <section className="details-profile-card">
                    <div className="profile-avatar">{initials(staff.name)}</div>

                    <div className="profile-info">
                        <h3 className="profile-name">
                            {staff.name}
                            {staff.status === "Active" && <span className="status-dot" />}
                        </h3>

                        <p className="profile-line">
                            <strong>Staff ID:</strong> {staff.id}
                        </p>
                        <p className="profile-line">
                            <strong>Role:</strong> {staff.role}
                        </p>
                        <p className="profile-line">
                            <strong>Department:</strong> {staff.department}
                        </p>
                        <p className="profile-line">
                            <strong>Last Login:</strong> {staff.lastLogin}
                        </p>

                        <div className="profile-actions">
                            <button className="action-btn action-green">Request Email</button>
                            <button className="action-btn action-red">Suspend Account</button>
                            <button className="action-btn action-orange">Reset Password</button>
                            <button className="action-btn action-purple">Lock Account</button>
                        </div>
                    </div>

                    <button className="edit-btn">✎ Edit</button>
                </section>

                <div className="details-lower">
                    <section className="details-panel">
                        <p>
                            <strong>Official E-mail:</strong> {staff.email}
                        </p>
                        <p>
                            <strong>Contact:</strong> {staff.contact}
                        </p>
                        <p>
                            <strong>Access Level:</strong>{" "}
                            <span className="access-level">{staff.accessLevel}</span>
                        </p>
                        <p>
                            <strong>Date Joined:</strong> {staff.dateJoined}
                        </p>
                    </section>

                    <section className="details-panel">
                        <h4 className="activity-heading">
                            Recent Activity <span>(Last 3 Actions)</span>
                        </h4>
                        <div className="activity-feed">
                            {staff.recentActivity.map((a, i) => (
                                <div className="activity-row" key={i}>
                                    <span className={`activity-dot ${i === 0 ? "dot-latest" : ""}`} />
                                    <div>
                                        <p className={`activity-time ${i === 0 ? "time-latest" : ""}`}>
                                            {a.time}
                                        </p>
                                        <p className="activity-text">{a.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
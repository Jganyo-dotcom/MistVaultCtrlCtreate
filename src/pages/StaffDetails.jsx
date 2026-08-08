import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BaseApi } from "../components/apiEndpoint";

import "./StaffDetails.css";

// Helper function to extract initials safely
function initials(name = "") {
  if (!name) return "??";
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Safely extracts display text from objects without dumping raw JSON objects
function getDisplayString(val, fallback = "N/A") {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "object") {
    return val.name || val.title || val.label || val.text || fallback;
  }
  return String(val);
}

// Cleans ISO strings (2026-08-08T17:21:22.217Z) into "2026-08-08 05:21 PM"
function formatDateTime(val, fallback = "N/A") {
  if (!val) return fallback;

  let rawDate = "";
  let rawTime = "";

  if (typeof val === "object" && val !== null) {
    rawDate = val.date || "";
    rawTime = val.time || "";
  } else if (typeof val === "string") {
    rawDate = val;
  }

  // Handle ISO string formatting (e.g., "2026-08-08T17:21:22.217Z")
  if (rawDate && typeof rawDate === "string" && rawDate.includes("T")) {
    try {
      const parsed = new Date(rawDate);
      if (!isNaN(parsed.getTime())) {
        // Extract YYYY-MM-DD
        rawDate = parsed.toISOString().split("T")[0];

        // If time was not provided separately, format time from ISO string
        if (!rawTime) {
          rawTime = parsed.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }
      } else {
        rawDate = rawDate.split("T")[0];
      }
    } catch (e) {
      rawDate = rawDate.split("T")[0];
    }
  }

  const result = `${rawDate} ${rawTime}`.trim();
  return result || fallback;
}

export default function StaffDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Component states
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Retrieve token from localStorage
        const token = localStorage.getItem("authToken");

        // Trigger HTTP request to Express backend
        const response = await fetch(`${BaseApi}/accountStaff/staff/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch staff details.");
        }

        // Unpack staff object from response
        const staffData = data.staff || data;
        setStaff(staffData);
      } catch (err) {
        console.error("Error loading staff details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStaffDetails();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="staff-details-layout">
        <main className="staff-details-main">
          <p style={{ padding: "30px", textAlign: "center", color: "#666" }}>
            Loading staff details...
          </p>
        </main>
      </div>
    );
  }

  // Error / Not Found State
  if (error || !staff) {
    return (
      <div className="staff-details-layout">
        <main className="staff-details-main">
          <div style={{ padding: "30px" }}>
            <p
              style={{
                color: "#d9534f",
                fontSize: "16px",
                marginBottom: "16px",
              }}
            >
              {error || "Staff member not found."}
            </p>
            <button className="back-btn" onClick={() => navigate("/staff")}>
              ‹ Back to Staff List
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Extract variables with safe fallbacks
  const rawName =
    staff.name || `${staff.firstName || ""} ${staff.lastName || ""}`.trim();
  const name = getDisplayString(rawName, "Unknown Staff");
  const staffID = getDisplayString(staff.id || staff.staffID || staff._id);
  const contact = getDisplayString(staff.contact || staff.phone);
  const status = staff.status || (staff.isActive ? "Active" : "Inactive");
  const recentActivity = Array.isArray(staff.recentActivity)
    ? staff.recentActivity
    : [];

  return (
    <div className="staff-details-layout">
      <main className="staff-details-main">
        <div className="details-topbar">
          <h2 className="details-title">
            <span className="details-icon">👤</span> Staff / Details
          </h2>
          <button className="back-btn" onClick={() => navigate("/staff")}>
            ‹ Back
          </button>
        </div>

        <section className="details-profile-card">
          <div className="profile-avatar">{initials(name)}</div>

          <div className="profile-info">
            <h3 className="profile-name">
              {name}
              {status === "Active" && <span className="status-dot" />}
            </h3>

            <p className="profile-line">
              <strong>Staff ID:</strong> {staffID}
            </p>
            <p className="profile-line">
              <strong>Role:</strong> {getDisplayString(staff.role)}
            </p>
            <p className="profile-line">
              <strong>Department:</strong> {getDisplayString(staff.department)}
            </p>
            <p className="profile-line">
              <strong>Last Login:</strong>{" "}
              {formatDateTime(staff.lastLogin || staff.lastLoginDate)}
            </p>

            <div className="profile-actions">
              <button className="action-btn action-green">Request Email</button>
              <button className="action-btn action-red">Suspend Account</button>
              <button className="action-btn action-orange">
                Reset Password
              </button>
              <button className="action-btn action-purple">Lock Account</button>
            </div>
          </div>

          <button className="edit-btn">✎ Edit</button>
        </section>

        <div className="details-lower">
          <section className="details-panel">
            <p>
              <strong>Official E-mail:</strong> {getDisplayString(staff.email)}
            </p>
            <p>
              <strong>Contact:</strong> {contact}
            </p>
            <p>
              <strong>Access Level:</strong>{" "}
              <span className="access-level">
                {getDisplayString(staff.accessLevel || staff.role)}
              </span>
            </p>
            <p>
              <strong>Date Joined:</strong>{" "}
              {formatDateTime(staff.dateJoined || staff.createdAt)}
            </p>
          </section>

          <section className="details-panel">
            <h4 className="activity-heading">
              Recent Activity <span>(Last 3 Actions)</span>
            </h4>
            <div className="activity-feed">
              {recentActivity.length > 0 ? (
                recentActivity.map((a, i) => (
                  <div className="activity-row" key={a._id || i}>
                    <span
                      className={`activity-dot ${i === 0 ? "dot-latest" : ""}`}
                    />
                    <div>
                      <p
                        className={`activity-time ${i === 0 ? "time-latest" : ""}`}
                      >
                        {formatDateTime(a.time || a.date || a.timestamp)}
                      </p>
                      <p className="activity-text">
                        {getDisplayString(a.text || a.action || a.description)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#888", fontSize: "14px" }}>
                  No recent activity recorded.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
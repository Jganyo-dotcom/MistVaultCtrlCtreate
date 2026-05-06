import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { HospitalContext } from "../contexts/HospitalContext";
import "../styles/HospitalDetails.css";

function HospitalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateHospital } = useContext(HospitalContext);

  const [hospitalData, setHospitalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const controller = new AbortController();
    fetch(`/hospitals/${id}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Hospital not found");
        }
        return res.json();
      })
      .then((data) => {
        setHospitalData(data);
        setEditData(data);
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Hospital not found");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]:
        name === "departments" || name === "staff" || name === "engagement"
          ? Number(value)
          : value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setHospitalData(editData);
    updateHospital(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(hospitalData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="details-container">
        <p>Loading hospital details…</p>
      </div>
    );
  }

  if (error || !hospitalData) {
    return (
      <div className="details-container" style={{ padding: "20px" }}>
        <p>{error || "Hospital data not found."}</p>
        <button onClick={() => navigate("/hospitals")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="details-container">

      <div className="back" onClick={() => navigate(-1)}>
        ← Back
      </div>

      {/* TOP */}
      <div className="details-card">
        <div className="details-header">

          <div className="avatar">
            {hospitalData.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div className="info">
            {isEditing ? (
              <div className="details-form">
                <label>
                  Hospital Name
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Representative
                  <input
                    name="representative"
                    value={editData.representative}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Location
                  <input
                    name="location"
                    value={editData.location}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Contact
                  <input
                    name="contact"
                    value={editData.contact}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            ) : (
              <>
                <h2>
                  {hospitalData.name}
                  <span
                    className="status-dot"
                    style={{
                      background:
                        hospitalData.status === "active"
                          ? "#22c55e"
                          : "#dc2626"
                    }}
                  ></span>
                </h2>
                <p>👤 {hospitalData.representative}</p>
                <p>📍 {hospitalData.location}</p>
                <p>✉️ {hospitalData.email}</p>
                <p>📞 {hospitalData.contact}</p>
              </>
            )}
          </div>

          {isEditing ? (
            <div className="details-actions">
              <button className="edit-btn save" onClick={handleSave}>
                Save
              </button>
              <button className="edit-btn cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="edit-btn" onClick={handleEditToggle}>
              Edit
            </button>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn-green">Revoke Admin Access</button>
          <button className="btn-yellow">Deactivate</button>
          <button className="btn-red">Delete</button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="details-grid">

        <div className="details-box">
          <h3>Hospital Details</h3>
          <div className="details-field">
            <span>🆔 Access ID:</span>
            {hospitalData.accessId}
          </div>
          <div className="details-field">
            <span>📅 Date Registered:</span>
            {hospitalData.date}
          </div>
          <div className="details-field">
            <span>🌐 Website:</span>
            {hospitalData.website}
          </div>
          <div className="details-field">
            <span>🏥 Departments:</span>
            {hospitalData.departments}
          </div>
          <div className="details-field">
            <span>👥 Staff:</span>
            {hospitalData.staff}
          </div>
          <div className="details-field">
            <span>📈 Engagement:</span>
            {hospitalData.engagement}%
          </div>
        </div>

        <div className="details-box center">
          <h3>Performance</h3>

          <div className="recharts-wrapper">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Engagement", value: hospitalData.engagement },
                    { name: "Remaining", value: 100 - hospitalData.engagement }
                  ]}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                >
                  <Cell key="engagement" fill="#2563eb" />
                  <Cell key="remaining" fill="#e5e7eb" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="inner">
              <h2>{hospitalData.engagement}%</h2>
              <span>Engagement</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default HospitalDetails;
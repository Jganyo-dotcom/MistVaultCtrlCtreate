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
    const controller = new AbortController();

    fetch(`/hospitals/${id}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) throw new Error("Hospital not found");
        return res.json();
      })
      .then((data) => {
        setHospitalData(data);
        setEditData(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
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
        ["departments", "staff", "engagement"].includes(name)
          ? Number(value)
          : value
    }));
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

  if (loading) return <div className="details-container">Loading...</div>;

  if (error || !hospitalData)
    return (
      <div className="details-container">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );

  return (
    <div className="details-container">

      <div className="back" onClick={() => navigate(-1)}>← Back</div>

      {/* TOP CARD */}
      <div className="details-card">
        <div className="details-header">

          <div className="avatar">
            {hospitalData.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="info">

            {isEditing ? (
              <div className="details-form">

                {["name", "representative", "location", "email", "contact"].map((field) => (
                  <div className="form-group" key={field}>
                    <input
                      name={field}
                      value={editData[field]}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                    />
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  </div>
                ))}

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
                          : "#ef4444"
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

          <div className="actions">
            {isEditing ? (
              <>
                <button className="btn primary" onClick={handleSave}>Save</button>
                <button className="btn ghost" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <button className="btn ghost" onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>

        </div>

        <div className="action-buttons">
          <button className="btn success">Revoke Admin</button>
          <button className="btn warning">Deactivate</button>
          <button className="btn danger">Delete</button>
        </div>
      </div>

      {/* GRID */}
      <div className="details-grid">

        {/* LEFT */}
        <div className="details-box">
          <h3>Hospital Details</h3>

          <div className="details-field"><span>ID</span>{hospitalData.accessId}</div>
          <div className="details-field"><span>Registered</span>{hospitalData.date}</div>
          <div className="details-field"><span>Website</span>{hospitalData.website}</div>
          <div className="details-field"><span>Departments</span>{hospitalData.departments}</div>
          <div className="details-field"><span>Staff</span>{hospitalData.staff}</div>

        </div>

        {/* RIGHT */}
        <div className="details-box center">
          <h3>Performance (since registration)</h3>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Engagement", value: hospitalData.engagement },
                    { name: "Remaining", value: 100 - hospitalData.engagement }
                  ]}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#fee2e2" />
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
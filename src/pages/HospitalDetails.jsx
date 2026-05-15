import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

import { HospitalContext } from "../contexts/HospitalContext";
import DeleteModal from "../components/DeleteModal";
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/hospitals/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Hospital not found");
        return res.json();
      })
      .then((data) => {
        setHospitalData(data);
        setEditData(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/hospitals/${hospitalData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData)
        }
      );

      const updated = await res.json();
      setHospitalData(updated);
      setIsEditing(false);

      toast.success("Hospital updated successfully");

    } catch (err) {
      toast.error("Failed to update hospital");
    }
  };

  // 🔥 FULL DELETE FLOW (Toast + Undo)
  const handleDelete = async ({ reason, confirmText }) => {
    if (confirmText !== "DELETE") {
      return toast.error("Type DELETE to confirm");
    }

    try {
      setDeleting(true);

      const deletedHospital = hospitalData;

      // ✅ Close modal immediately
      setShowDeleteModal(false);

      // ✅ Navigate instantly (optimistic UI)
      navigate("/hospitals");

      // 🔥 TOAST WITH UNDO BUTTON
      toast((t) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>Hospital deleted</span>

          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
            onClick={async () => {
              try {
                await fetch("http://localhost:5000/hospitals", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(deletedHospital),
                });

                toast.success("Hospital restored");
                toast.dismiss(t.id);

              } catch {
                toast.error("Restore failed");
              }
            }}
          >
            Undo
          </button>
        </div>
      ), { duration: 5000 });

      // ⏳ Delay actual delete (gives undo window)
      setTimeout(async () => {
        await fetch(
          `http://localhost:5000/hospitals/${deletedHospital._id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reason }),
          }
        );
      }, 5000);

    } catch (err) {
      console.error(err);
      toast.error("Failed to delete hospital");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="details-container">Loading...</div>;

  if (error || !hospitalData)
    return <div className="details-container">{error}</div>;

  return (
    <div className="details-container">

      <div className="back" onClick={() => navigate(-1)}>← Back</div>

      <div className="details-card">
        <div className="details-header">

          <div className="avatar">
            {hospitalData.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="info">
            <h2>{hospitalData.name}</h2>
            <p>👤 {hospitalData.representative}</p>
            <p>📍 {hospitalData.location}</p>
            <p>✉️ {hospitalData.email}</p>
            <p>📞 {hospitalData.contact}</p>
          </div>

          <button className="btn ghost" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>

        <div className="action-buttons">
          <button className="btn success">Revoke Admin</button>
          <button className="btn warning">Deactivate</button>

          <button
            className="btn danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="details-grid">

        <div className="details-box">
          <h3>Hospital Details</h3>
          <div className="details-field"><span>ID</span>{hospitalData.accessId}</div>
          <div className="details-field"><span>Registered</span>{hospitalData.date}</div>
          <div className="details-field"><span>Website</span>{hospitalData.website}</div>
          <div className="details-field"><span>Departments</span>{hospitalData.departments}</div>
          <div className="details-field"><span>Staff</span>{hospitalData.staff}</div>
          <div className="details-field"><span>Engagement</span>{hospitalData.engagement}%</div>
        </div>

        <div className="details-box center">
          <h3>Performance</h3>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={[
                    { value: hospitalData.engagement },
                    { value: 100 - hospitalData.engagement }
                  ]}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
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

      {/* ✅ DELETE MODAL */}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />

    </div>
  );
}

export default HospitalDetails;
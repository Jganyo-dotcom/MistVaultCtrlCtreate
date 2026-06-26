import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

import { HospitalContext } from "../contexts/HospitalContext";
import DeleteModal from "../components/DeleteModal";
import {
  getHospitalById,
  reEnableHospital,
  sendNotification,
  suspendHospital,
} from "../services/hospitalService";
import "../styles/HospitalDetails.css";

function HospitalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateHospital } = useContext(HospitalContext);

  const [hospitalData, setHospitalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const hospital = await getHospitalById(id); // returns hospital object
        setHospitalData(hospital);

        // Structure the edit state dynamically to prevent structural reference breaking
        setEditData({
          name: hospital?.hospitalDetails?.name || "",
          repName: hospital?.hospitalRep?.name || "",
          repEmail: hospital?.hospitalRep?.email || "",
          repPhone: hospital?.hospitalRep?.phone || "",
          address: hospital?.hospitalDetails?.addresse || "",
          email: hospital?.hospitalDetails?.contact?.email || "",
          phone: hospital?.hospitalDetails?.contact?.phone || "",
        });
      } catch (err) {
        setError("Failed to fetch hospital");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHospital();
  }, [id]);

  // Form input values live-updater
  const handleInputChange = (section, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit the updated dataset payload straight to the backend service
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    // Build modern structure back to match backend architecture expectations
    const payload = {
      "hospitalDetails.name": editData.name,
      "hospitalDetails.addresse": editData.address,
      "hospitalDetails.contact.email": editData.email,
      "hospitalDetails.contact.phone": editData.phone,
      "hospitalRep.name": editData.repName,
      "hospitalRep.email": editData.repEmail,
      "hospitalRep.phone": editData.repPhone,
    };

    try {
      // Execute context update action
      const response = await updateHospital(
        hospitalData._id || hospitalData.id,
        payload,
      );

      // Merge changes into view safely
      setHospitalData((prev) => ({
        ...prev,
        hospitalDetails: {
          ...prev.hospitalDetails,
          name: editData.name,
          addresse: editData.address,
          contact: {
            ...prev.hospitalDetails?.contact,
            email: editData.email,
            phone: editData.phone,
          },
        },
        hospitalRep: {
          ...prev.hospitalRep,
          name: editData.repName,
          email: editData.repEmail,
          phone: editData.repPhone,
        },
      }));

      toast.success(
        response?.message || "Hospital configurations updated successfully! 🎉",
      );
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message || "Failed to update hospital metadata records.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="details-container">Loading...</div>;
  if (error || !hospitalData)
    return <div className="details-container">{error}</div>;

  return (
    <div className="details-container">
      <div className="back" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <div className="details-card">
        <div className="details-header">
          <div className="avatar">
            {hospitalData?.hospitalDetails?.name
              ? hospitalData.hospitalDetails.name.slice(0, 2).toUpperCase()
              : "NA"}
          </div>

          <div className="info">
            <h2>{hospitalData.hospitalDetails?.name}</h2>
            <p>👤 Representative: {hospitalData.hospitalRep?.name}</p>
            <p>✉️ Rep email: {hospitalData.hospitalRep?.email}</p>
            <p>📞 Rep phone: {hospitalData.hospitalRep?.phone}</p>
            <p>📍 Location: {hospitalData.hospitalDetails?.addresse}</p>
            <p>✉️ Email: {hospitalData.hospitalDetails?.contact?.email}</p>
            <p>📞 Contact: {hospitalData.hospitalDetails?.contact?.phone}</p>
          </div>

          <div className="edit-btn">
            <button className="btn ghost" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button
            onClick={() => suspendHospital(hospitalData.id || hospitalData._id)}
            className="btn success"
          >
            Deactivate
          </button>
          <button
            className="btn success"
            onClick={() =>
              sendNotification(hospitalData.id || hospitalData._id)
            }
          >
            Launch
          </button>
          <button
            onClick={() =>
              reEnableHospital(hospitalData.id || hospitalData._id)
            }
            className="btn warning"
          >
            Activate
          </button>
          <button
            className="btn danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Archive
          </button>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-box">
          <h3>Hospital Details</h3>
          <div className="details-field">
            <span>Access ID</span>
            {hospitalData._id}
          </div>
          <div className="details-field">
            <span>Date Registered</span>
            {new Date(hospitalData.createdAt).toLocaleDateString()}
          </div>
          <div className="details-field">
            <span>Status</span>
            {hospitalData.active ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="details-box center">
          <h3>Performance</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={[
                    { value: hospitalData.engagement || 0 },
                    { value: 100 - (hospitalData.engagement || 0) },
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
              <h2>{hospitalData.engagement || 0}%</h2>
              <span>Engagement</span>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT CLINICAL PARAMETERS FORM MODAL */}
      {isEditing && editData && (
        <div className="modal-overlay">
          <form className="details-modal glass" onSubmit={handleUpdateSubmit}>
            <h2>Modify Hospital Profile</h2>

            <div className="form-section-title">🏥 Hospital Details</div>
            <div className="form-row">
              <div className="input-group">
                <label>Hospital Name</label>
                <input
                  type="text"
                  required
                  disabled={updating}
                  value={editData.name}
                  onChange={(e) =>
                    handleInputChange("details", "name", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Location / Address</label>
                <input
                  type="text"
                  required
                  disabled={updating}
                  value={editData.address}
                  onChange={(e) =>
                    handleInputChange("details", "address", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Hospital Email</label>
                <input
                  type="email"
                  required
                  disabled={updating}
                  value={editData.email}
                  onChange={(e) =>
                    handleInputChange("details", "email", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <label>Hospital Contact</label>
                <input
                  type="text"
                  required
                  disabled={updating}
                  value={editData.phone}
                  onChange={(e) =>
                    handleInputChange("details", "phone", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-section-title">👤 Representative Details</div>
            <div className="form-row">
              <div className="input-group">
                <label>Rep Name</label>
                <input
                  type="text"
                  required
                  disabled={updating}
                  value={editData.repName}
                  onChange={(e) =>
                    handleInputChange("rep", "repName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Rep Email</label>
                <input
                  type="email"
                  required
                  disabled={updating}
                  value={editData.repEmail}
                  onChange={(e) =>
                    handleInputChange("rep", "repEmail", e.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <label>Rep Phone</label>
                <input
                  type="text"
                  required
                  disabled={updating}
                  value={editData.repPhone}
                  onChange={(e) =>
                    handleInputChange("rep", "repPhone", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn ghost"
                disabled={updating}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn success" disabled={updating}>
                {updating ? "Saving Changes..." : "Update Details"}
              </button>
            </div>
          </form>
        </div>
      )}

      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          /* implement delete flow */
        }}
        loading={deleting}
      />
    </div>
  );
}

export default HospitalDetails;

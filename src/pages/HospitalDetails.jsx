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
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const hospital = await getHospitalById(id); // returns hospital object
        setHospitalData(hospital);
        setEditData(hospital);
      } catch (err) {
        setError("Failed to fetch hospital");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHospital();
  }, [id]);

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
            <p>👤 {hospitalData.hospitalRep?.name}</p>
            <p>📍 {hospitalData.hospitalDetails?.addresse}</p>
            <p>✉️ {hospitalData.hospitalDetails?.contact?.email}</p>
            <p>📞 {hospitalData.hospitalDetails?.contact?.phone}</p>
          </div>

          <button className="btn ghost" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>

        <div className="action-buttons">
          <button
            onClick={() => suspendHospital(hospitalData.id || hospitalData._id)}
            className="btn success"
          >
            suspend
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
            Archieve
          </button>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-box">
          <h3>Hospital Details</h3>
          <div className="details-field">
            <span>ID</span>
            {hospitalData._id}
          </div>
          <div className="details-field">
            <span>Registered</span>
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

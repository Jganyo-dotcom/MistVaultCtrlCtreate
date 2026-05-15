import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HospitalContext } from "../contexts/HospitalContext";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";
import { FiHome } from "react-icons/fi";

import "../styles/Hospitals.css";

function Hospitals() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(() => {
    const initial = searchParams.get("filter");
    return initial === "active" || initial === "inactive" ? initial : "all";
  });

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { hospitals, deleteHospital, addHospital } =
    useContext(HospitalContext);

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter === "active" || filter === "inactive") {
      setFilterStatus(filter);
    } else {
      setFilterStatus("all");
    }
  }, [searchParams]);

  const handleDeleteClick = (hospital) => {
    setDeleteTarget(hospital);
    setShowDeleteModal(true);
  };

  // 🔥 FULL DELETE FLOW (MATCHES DETAILS PAGE)
  const handleDeleteConfirm = ({ reason, confirmText }) => {
    if (confirmText !== "DELETE") {
      return toast.error("Type DELETE to confirm");
    }

    try {
      setDeleting(true);

      const deletedHospital = deleteTarget;

      // ✅ Close modal immediately
      setShowDeleteModal(false);

      // ✅ Optimistic UI (remove instantly)
      deleteHospital(deletedHospital.id);

      // 🔥 Toast with Undo
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
              cursor: "pointer",
            }}
            onClick={() => {
              addHospital(deletedHospital);
              toast.success("Hospital restored");
              toast.dismiss(t.id);
            }}
          >
            Undo
          </button>
        </div>
      ), { duration: 5000 });

      // ⏳ Optional backend delete delay
      setTimeout(() => {
        console.log("Send delete request to backend with reason:", reason);
      }, 5000);

    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleView = (hospital) => {
    navigate(`/hospitals/${hospital.id}`, { state: { hospital } });
  };

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || hospital.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="hospitals-container">

      {/* HEADER */}
      <div className="hospitals-header">

        <div className="header-left">
          <h1 className="title"><FiHome /> Hospitals</h1>

          <button
            className="add-btn"
            onClick={() => navigate("/add-hospital")}
          >
            Add Hospital
          </button>
        </div>

        <div className="header-actions">
          <div className="search-bar">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search by hospital name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-dropdown"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="hospitals-grid">
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <h3 className="hospital-name">{hospital.name}</h3>
            <p className="hospital-email">{hospital.email}</p>
            <p className="hospital-rep">
              Representative: <strong>{hospital.representative}</strong>
            </p>

            <div className={`status ${hospital.status}`}>
              <span className="dot"></span>
              {hospital.status}
            </div>

            <div className="hospital-actions">
              <button
                className="btn-view"
                onClick={() => handleView(hospital)}
              >
                View Details
              </button>

              <button
                className="btn-delete"
                onClick={() => handleDeleteClick(hospital)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ REUSABLE DELETE MODAL */}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />

    </div>
  );
}

export default Hospitals;
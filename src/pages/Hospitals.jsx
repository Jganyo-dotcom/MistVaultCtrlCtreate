import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HospitalContext } from "../contexts/HospitalContext";
import "../styles/Hospitals.css";

function Hospitals() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(() => {
    const initial = searchParams.get("filter");
    return initial === "active" || initial === "inactive" ? initial : "all";
  });

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [toast, setToast] = useState("");
  const { hospitals, deleteHospital } = useContext(HospitalContext);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

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

  const confirmDelete = () => {
    deleteHospital(deleteTarget.id);
    setShowDeleteModal(false);
    showToast("Hospital deleted successfully");
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

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}

      {/* HEADER */}
      <div className="hospitals-header">

        {/* LEFT */}
        <div className="header-left">
          <h1 className="title">Hospitals</h1>

          <button
            className="add-btn"
            onClick={() => navigate("/add-hospital")}
          >
            Add Hospital
          </button>
        </div>

        {/* RIGHT */}
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

      {/* VIEW MODAL */}
      {showModal && selectedHospital && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedHospital.name}</h2>
            <p><strong>Email:</strong> {selectedHospital.email}</p>
            <p><strong>Representative:</strong> {selectedHospital.representative}</p>
            <p><strong>Status:</strong> {selectedHospital.status}</p>

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && deleteTarget && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Delete Hospital</h2>
            <p>
              This action cannot be undone. Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong>?
            </p>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn-confirm-delete"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hospitals;
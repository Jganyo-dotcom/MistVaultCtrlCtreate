import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";
import { FiHome } from "react-icons/fi";

import "../styles/Hospitals.css";

function Hospitals() {
  //const BaseApi = "http://127.0.0.1:4444/api";
  const BaseApi = "https://medsec.onrender.com/api";
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
  const [hospitals, setHospitals] = useState([]);

  // 🔥 Fetch hospitals from backend
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const token = localStorage.getItem("authToken"); // 🔑 get token from localStorage

        const res = await fetch(
          `${BaseApi}/get-hospitals`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // attach token
            },
            credentials: "include", // only if backend also sets cookies
          },
        );

        if (!res.ok) throw new Error("Failed to fetch hospitals");

        const data = await res.json();
        setHospitals(data.hospitals); // backend returns { message, hospitals }
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        toast.error("Failed to load hospitals");
      }
    };
    fetchHospitals();
  }, []);

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

  const handleDeleteConfirm = ({ reason, confirmText }) => {
    if (confirmText !== "ARCHIVE") {
      return toast.error("Type DELETE to confirm");
    }

    try {
      setDeleting(true);
      const deletedHospital = deleteTarget;

      // ✅ Close modal immediately
      setShowDeleteModal(false);

      // ✅ Optimistic UI
      setHospitals((prev) => prev.filter((h) => h._id !== deletedHospital._id));

      // 🔥 Toast with Undo
      toast(
        (t) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>Hospital archived</span>
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
                setHospitals((prev) => [...prev, deletedHospital]);
                toast.success("Hospital restored");
                toast.dismiss(t.id);
              }}
            >
              Undo
            </button>
          </div>
        ),
        { duration: 5000 },
      );

      // ⏳ Backend delete request
      setTimeout(() => {
        fetch(
          `${BaseApi}/delete-hospital/${deletedHospital._id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reason }),
          },
        );
      }, 5000);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleView = (hospital) => {
    navigate(`/hospitals/${hospital._id}`, { state: { hospital } });
  };

  // 🔎 Filtering logic
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.hospitalDetails.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (hospital.active ? "active" : "inactive") === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="hospitals-container">
      {/* HEADER */}
      <div className="hospitals-header">
        <div className="header-left">
          <h1 className="title">
            <FiHome /> Hospitals
          </h1>
          <button className="add-btn" onClick={() => navigate("/add-hospital")}>
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
          <div key={hospital._id} className="hospital-card">
            <h3 className="hospital-name">{hospital.hospitalDetails.name}</h3>
            <p className="hospital-email">
              {hospital.hospitalDetails.contact.email}
            </p>
            <p className="hospital-rep">
              Representative: <strong>{hospital.hospitalRep.name}</strong>
            </p>
            <p className="hospital-rep">
              ID: <strong>{hospital.hospitalDetails.code}</strong>
            </p>

            <div
              className={`status ${hospital.active ? "active" : "inactive"}`}
            >
              <span className="dot"></span>
              {hospital.active ? "active" : "inactive"}
            </div>

            <div className="hospital-actions">
              <button className="btn-view" onClick={() => handleView(hospital)}>
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

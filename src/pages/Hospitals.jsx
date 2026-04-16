import React, { useState } from "react";
import "../styles/Hospitals.css";

function Hospitals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "Sunrise Clinic",
      location: "Lagos, Nigeria",
      status: "active",
      staff: 45,
      patients: 1230,
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Clean Health Hospital",
      location: "Abuja, Nigeria",
      status: "inactive",
      staff: 78,
      patients: 2450,
      joinDate: "2023-06-20"
    },
    {
      id: 3,
      name: "Promise Land Hospital",
      location: "Ibadan, Nigeria",
      status: "active",
      staff: 62,
      patients: 1890,
      joinDate: "2024-03-10"
    },
    {
      id: 4,
      name: "Wellheit Hospital",
      location: "Port Harcourt, Nigeria",
      status: "inactive",
      staff: 51,
      patients: 980,
      joinDate: "2023-11-05"
    },
    {
      id: 5,
      name: "Care Medical Center",
      location: "Kano, Nigeria",
      status: "active",
      staff: 38,
      patients: 750,
      joinDate: "2024-02-17"
    }
  ]);

  const [newHospital, setNewHospital] = useState({
    name: "",
    location: "",
    status: "active",
    staff: "",
    patients: ""
  });

  // Filter hospitals based on search and status
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || hospital.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddHospital = (e) => {
    e.preventDefault();
    if (newHospital.name && newHospital.location) {
      const hospital = {
        id: hospitals.length + 1,
        ...newHospital,
        staff: parseInt(newHospital.staff) || 0,
        patients: parseInt(newHospital.patients) || 0,
        joinDate: new Date().toISOString().split("T")[0]
      };
      setHospitals([...hospitals, hospital]);
      setNewHospital({
        name: "",
        location: "",
        status: "active",
        staff: "",
        patients: ""
      });
      setShowModal(false);
    }
  };

  return (
    <div className="hospitals-container">
      <div className="hospitals-header">
        <h1>Hospitals Management</h1>
        <p className="subtitle">Manage and monitor all registered hospitals</p>
      </div>

      <div className="hospitals-controls">
        <div className="search-bar">
          <i>🔍</i>
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="controls-right">
          <select
            className="filter-dropdown"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Hospitals</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="add-hospital-btn" onClick={() => setShowModal(true)}>
            Add Hospital
          </button>
        </div>
      </div>

      <div className="hospitals-grid">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="hospital-card">
              <div className="hospital-header">
                <h3>{hospital.name}</h3>
                <span className={`status-badge ${hospital.status}`}>
                  {hospital.status.charAt(0).toUpperCase() +
                    hospital.status.slice(1)}
                </span>
              </div>
              <div className="hospital-details">
                <p className="location">📍 {hospital.location}</p>
                <div className="hospital-stats">
                  <div className="stat">
                    <span className="stat-label">Staff</span>
                    <span className="stat-value">{hospital.staff}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Patients</span>
                    <span className="stat-value">{hospital.patients}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Joined</span>
                    <span className="stat-value">{hospital.joinDate}</span>
                  </div>
                </div>
              </div>
              <div className="hospital-actions">
                <button className="btn-view">View Details</button>
                <button className="btn-edit">Edit</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No hospitals found</p>
          </div>
        )}
      </div>

      {/* Add Hospital Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Hospital</h2>
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddHospital}>
              <div className="form-group">
                <label>Hospital Name *</label>
                <input
                  type="text"
                  required
                  value={newHospital.name}
                  onChange={(e) =>
                    setNewHospital({ ...newHospital, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  required
                  value={newHospital.location}
                  onChange={(e) =>
                    setNewHospital({
                      ...newHospital,
                      location: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Number of Staff</label>
                  <input
                    type="number"
                    value={newHospital.staff}
                    onChange={(e) =>
                      setNewHospital({ ...newHospital, staff: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Number of Patients</label>
                  <input
                    type="number"
                    value={newHospital.patients}
                    onChange={(e) =>
                      setNewHospital({
                        ...newHospital,
                        patients: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={newHospital.status}
                  onChange={(e) =>
                    setNewHospital({ ...newHospital, status: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Hospital
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hospitals;

import React, { useState, useEffect } from "react";
import "../styles/AuditLogs.css";
import { ClipboardList, X, Download } from "lucide-react";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  // Use the Vite environment variable we configured earlier
  const API_URL =  "https://medsec.onrender.com";

  // Today's date in YYYY-MM-DD format dynamically
  const TODAY = new Date().toISOString().split("T")[0];
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        // Appends date filter query parameter if selected, otherwise defaults to today
        const targetDate = selectedDate || TODAY;
        const response = await fetch(`${API_URL}/api/get-all-logs?date=${targetDate}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // standard format for sending tokens
          "Content-Type": "application/json"
        }
      });


        
        if (!response.ok) {
          throw new Error("Failed to fetch audit logs");
        }
        
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [selectedDate, API_URL, TODAY]);

  // Maps action types to visual status dot colors
  const getColorByAction = (action) => {
    switch (action) {
      case "SENT_HOSPITAL_DETAILS": return "green";
      case "FAILED_LOGIN": return "red";
      default: return "blue";
    }
  };

  // Helper to format ISO timestamps into cleanly readable times
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  // Triggers browser download of log details as a formatted JSON file
  const downloadLogJSON = (log) => {
    const fileData = JSON.stringify(log, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `log-${log._id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="auditlogs-container">
      <div className="auditlogs-header">
        <div className="auditlogs-title">
          <ClipboardList size={28} color="#1e3a5f" />
          <h1>Audit Log</h1>
        </div>
        <button className="auditlogs-dropdown" onClick={() => setShowCalendar(!showCalendar)}>
          Date ▾
        </button>

        {showCalendar && (
          <div className="auditlogs-calendar">
            <input
              type="date"
              max={TODAY}
              value={selectedDate || TODAY}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setShowCalendar(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="auditlogs-list">
        {loading && <p className="logs-status">Loading logs...</p>}
        {error && <p className="logs-status error">Error: {error}</p>}
        
        {!loading && !error && logs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#94a3b8", padding: "40px 0" }}>
            No logs found for this day.
          </p>
        ) : (
          logs.map((log) => (
            <div className="auditlogs-card" key={log._id}>
              <span className={`auditlogs-dot ${getColorByAction(log.action)}`}></span>
              <p className="auditlogs-message">{log.message}</p>
              <div className="auditlogs-right">
                <span className="auditlogs-time">{formatTime(log.createdAt)}</span>
                <button className="auditlogs-export" onClick={() => setSelectedLog(log)}>
                  ☁ Export Log
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Preview & Export Modal */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Log Details</h2>
              <button className="close-btn" onClick={() => setSelectedLog(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-group">
                <label>Action Statement:</label>
                <p>{selectedLog.message}</p>
              </div>
              <div className="detail-group">
                <label>Performed By:</label>
<p>
  {selectedLog.user?.name || selectedLog.user.hospitalRep.name}
  (
    {selectedLog.user?.email || selectedLog.user.hospitalRep.email}
  )
</p>

              </div>
              <div className="detail-group">
                <label>Entity Impacted:</label>
                <p>{selectedLog.entityType}</p>
              </div>
              
              {selectedLog.hospitalDetails && (
                <div className="metadata-box">
                  <h3>Hospital Metadata</h3>
                  <p><strong>Name:</strong> {selectedLog.hospitalDetails.name}</p>
                  <p><strong>System Code:</strong> {selectedLog.hospitalDetails.code}</p>
                  <p><strong>Address:</strong> {selectedLog.hospitalDetails.address}</p>
                  <p><strong>Phone:</strong> {selectedLog.hospitalDetails.contact?.phone}</p>
                  <p><strong>Email:</strong> {selectedLog.hospitalDetails.contact?.email}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="download-btn" onClick={() => downloadLogJSON(selectedLog)}>
                <Download size={16} /> Download Raw File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
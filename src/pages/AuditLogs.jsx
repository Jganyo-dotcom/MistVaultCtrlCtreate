import React, { useState } from "react";
import "../styles/AuditLogs.css";
import { ClipboardList } from "lucide-react";

const logs = [
  { id: 1, color: "green", message: "Sunrise Clinic hospital admin added new radiology staff...", time: "Today, 10:42am" },
  { id: 2, color: "green", message: "Afolabi Samuel added a new hospital.", time: "Today, 10:42am" },
  { id: 3, color: "blue", message: "Login code generated for Riverland Clinic.", time: "Today, 10:42am" },
  { id: 4, color: "red", message: "Multiple failed login attempts detected for Promise Land H...", time: "Today, 10:42am" },
  { id: 5, color: "blue", message: "Daily sync completed for Bloom Private Clinic.", time: "Today, 10:42am" },
  { id: 6, color: "red", message: "Hospital account temporarily suspended due to inactivity.", time: "Today, 10:42am" },
  { id: 7, color: "green", message: "Diagnostic Centre connected to MedSync Hospital.", time: "Today, 10:42am" },
  { id: 8, color: "blue", message: "Login code generated for RiverLand Clinic.", time: "Today, 10:42am" },
  { id: 9, color: "blue", message: "Login code generated for RiverLand Clinic.", time: "Today, 10:42am" },
  { id: 10, color: "blue", message: "Login code generated for RiverLand Clinic.", time: "Today, 10:42am" },
];

const AuditLogs = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="auditlogs-container">
      <div className="auditlogs-header">
        <div className="auditlogs-title">
          <ClipboardList size={28} color="#1e3a5f" />
          <h1>Audit Log</h1>
        </div>
        <button className="auditlogs-dropdown" onClick={() => setShowCalendar(!showCalendar)}>
          Today ▾
        </button>
        {showCalendar && (
          <div className="auditlogs-calendar">
            <input type="date" onChange={() => setShowCalendar(false)} />
          </div>
        )}
      </div>

      <div className="auditlogs-list">
        {logs.map((log) => (
          <div className="auditlogs-card" key={log.id}>
            <span className={`auditlogs-dot ${log.color}`}></span>
            <p className="auditlogs-message">{log.message}</p>
            <div className="auditlogs-right">
              <span className="auditlogs-time">{log.time}</span>
              <button className="auditlogs-export">☁ Export Log</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogs;
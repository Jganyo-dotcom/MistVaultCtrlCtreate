import React, { useState } from "react";
import "../styles/AuditLogs.css";
import { ClipboardList } from "lucide-react";

const logs = [
  { id: 1, color: "green", message: "Sunrise Clinic hospital admin added new radiology staff...", date: "2026-05-19", time: "Today, 10:42am" },
  { id: 2, color: "green", message: "Afolabi Samuel added a new hospital.", date: "2026-05-19", time: "Today, 02:53pm" },
  { id: 3, color: "blue", message: "Login code generated for Riverland Clinic.", date: "2026-05-18", time: "Yesterday, 10:42am" },
  { id: 4, color: "red", message: "Multiple failed login attempts detected for Promise Land H...", date: "2026-05-11", time: "Last week Monday, 10:48pm" },
  { id: 5, color: "blue", message: "Daily sync completed for Bloom Private Clinic.", date: "2026-05-15", time: "Last week Friday, 09:42am" },
  { id: 6, color: "red", message: "Hospital account temporarily suspended due to inactivity.", date: "2026-05-12", time: "Last week Tuesday, 10:42am" },
  { id: 7, color: "green", message: "Diagnostic Centre connected to MedSync Hospital.", date: "2026-05-13", time: "Wednesday, 10:42pm" },
  { id: 8, color: "blue", message: "Login code generated for RiverLand Clinic.", date: "2026-05-19", time: "Today, 10:42am" },
  { id: 9, color: "blue", message: "Login code generated for RiverLand Clinic.", date: "2026-05-13", time: "Friday, 10:50am" },
  { id: 10, color: "blue", message: "Login code generated for RiverLand Clinic.", date: "2026-05-19", time: "Today, 10:42am" },
];

const AuditLogs = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const TODAY = "2026-05-19";

  const filteredLogs = selectedDate
    ? logs.filter((log) => log.date === selectedDate)
    : logs.filter((log) => log.date === TODAY);

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
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setShowCalendar(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="auditlogs-list">
        {filteredLogs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#94a3b8", padding: "40px 0" }}>
            No logs found for this day.
          </p>
        ) : (
          filteredLogs.map((log) => (
            <div className="auditlogs-card" key={log.id}>
              <span className={`auditlogs-dot ${log.color}`}></span>
              <p className="auditlogs-message">{log.message}</p>
              <div className="auditlogs-right">
                <span className="auditlogs-time">{log.time}</span>
                <button className="auditlogs-export">☁ Export Log</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AuditLogs;
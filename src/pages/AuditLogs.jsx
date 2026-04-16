import React, { useState } from "react";
import "../styles/AuditLogs.css";

function AuditLogs() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: "2026-04-15 14:32:00",
      hospital: "Sunrise Clinic",
      user: "Akpan Samuel",
      action: "updated",
      description: "Updated hospital staff count from 40 to 45",
      type: "update"
    },
    {
      id: 2,
      timestamp: "2026-04-15 13:15:00",
      hospital: "Clean Health Hospital",
      user: "Audit Father",
      action: "deleted",
      description: "Deleted hospital due to incorrect hospital details",
      type: "delete"
    },
    {
      id: 3,
      timestamp: "2026-04-15 12:45:00",
      hospital: "Promise Land Hospital",
      user: "System",
      action: "backup",
      description: "Automated daily backup completed successfully",
      type: "backup"
    },
    {
      id: 4,
      timestamp: "2026-04-15 11:20:00",
      hospital: "Wellheit Hospital",
      user: "Admin User",
      action: "deactivated",
      description: "Hospital deactivated due to inactivity",
      type: "deactivate"
    },
    {
      id: 5,
      timestamp: "2026-04-15 10:05:00",
      hospital: "Care Medical Center",
      user: "Tolu",
      action: "created",
      description: "Created new hospital account",
      type: "create"
    },
    {
      id: 6,
      timestamp: "2026-04-15 09:30:00",
      hospital: "Sunrise Clinic",
      user: "Dr. John",
      action: "password_reset",
      description: "Password reset requested and processed",
      type: "security"
    },
    {
      id: 7,
      timestamp: "2026-04-15 08:15:00",
      hospital: "Promise Land Hospital",
      user: "Tolu",
      action: "login_failed",
      description: "Failed login attempt (incorrect password)",
      type: "security"
    },
    {
      id: 8,
      timestamp: "2026-04-15 07:45:00",
      hospital: "Clean Health Hospital",
      user: "Admin User",
      action: "permissions_updated",
      description: "Updated user permissions for hospital staff",
      type: "update"
    }
  ]);

  const [filterAction, setFilterAction] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter((log) => {
    const matchesAction = filterAction === "all" || log.action === filterAction;
    const matchesSearch =
      log.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAction && matchesSearch;
  });

  const getActionIcon = (type) => {
    const icons = {
      update: "✏️",
      delete: "🗑️",
      backup: "💾",
      deactivate: "⏹️",
      create: "➕",
      security: "🔒",
      default: "📋"
    };
    return icons[type] || icons.default;
  };

  return (
    <div className="auditlogs-container">
      <div className="auditlogs-header">
        <h1>Audit Logs</h1>
        <p className="subtitle">Monitor all hospital activities and system actions</p>
      </div>

      <div className="auditlogs-controls">
        <div className="search-bar">
          <i>🔍</i>
          <input
            type="text"
            placeholder="Search by hospital, user, or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="filter-dropdown"
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
        >
          <option value="all">All Actions</option>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
          <option value="deleted">Deleted</option>
          <option value="deactivated">Deactivated</option>
          <option value="backup">Backup</option>
          <option value="password_reset">Password Reset</option>
          <option value="login_failed">Login Failed</option>
          <option value="permissions_updated">Permissions Updated</option>
        </select>
      </div>

      <div className="logs-table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Hospital</th>
              <th>User</th>
              <th>Action</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="timestamp">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="hospital-name">{log.hospital}</td>
                  <td className="user-name">{log.user}</td>
                  <td>
                    <div className="action-badge">
                      <span className="action-icon">
                        {getActionIcon(log.type)}
                      </span>
                      <span className={`action-text ${log.type}`}>
                        {log.action
                          .replace(/_/g, " ")
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </span>
                    </div>
                  </td>
                  <td className="description">{log.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditLogs;

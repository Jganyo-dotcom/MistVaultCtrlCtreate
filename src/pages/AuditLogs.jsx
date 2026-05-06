import React, { useState, useContext } from "react";
import { ActivityContext } from "../contexts/ActivityContext";
import "../styles/AuditLogs.css";

function AuditLogs() {
  const { logs } = useContext(ActivityContext);
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

import React, { createContext, useState } from "react";

export const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [logs] = useState([
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

  return (
    <ActivityContext.Provider value={{ logs }}>
      {children}
    </ActivityContext.Provider>
  );
}

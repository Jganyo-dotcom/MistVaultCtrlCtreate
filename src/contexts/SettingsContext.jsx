import React, { createContext, useState, useEffect } from "react";
const BASE_URL = "https://medsec.onrender.com/api";
//const BaseApi = "http://127.0.0.1:4444/api"

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user settings from backend when provider mounts
  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch(`${BASE_URL}/manager/settings`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // attach token if required
          },
        });

        if (!res.ok) throw new Error("Failed to fetch settings");

        const data = await res.json();
        console.log(data)
        setUser(data.user); // backend should return { user: {...} }
      } catch (err) {
        console.error("Error fetching settings:", err);
        setError("Could not load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchUserSettings();
  }, []);

  const updateUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch(
        `${BASE_URL}/update-manager/settings`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        },
      );

      const data = await res.json();

      if (res.ok) {
        setUser(data.user); // update context
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || "Update failed" };
      }
    } catch (err) {
      console.error("Error updating settings:", err);
      return { success: false, message: "Connection error" };
    }
  };

  return (
    <SettingsContext.Provider value={{ user, updateUser, loading, error }}>
      {children}
    </SettingsContext.Provider>
  );
}

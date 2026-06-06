import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const HospitalContext = createContext();

// Change this URL to match your backend port if different (e.g., 8000, 3000)
const API_BASE_URL = "https://medsec.onrender.com/api";
//const API_BASE_URL = "http://127.0.0.1:4444/api"
const token = localStorage.getItem("authToken");

export function HospitalProvider({ children }) {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all hospitals from the database on initial mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-hospitals`);
        if (!response.ok)
          throw new Error("Failed to fetch hospitals from server");

        const data = await response.json();
        // Fallback checks to prevent array mapping bugs
        const hospitalsArray = Array.isArray(data)
          ? data
          : data.hospitals || [];
        setHospitals(hospitalsArray);
      } catch (error) {
        console.error("Database initialization error:", error);
        toast.error("Could not load hospital database");
      } finally {
        setLoading(false);
      }
    };
  }, []);

  // 2. POST Request: Register New Hospital
  const addHospital = async (newHospital) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register-hospital`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newHospital),
      });

      const data = await response.json();

      if (!response.ok) {
        // Extract the server message or error array
        let serverError =
          data.message ||
          data.error ||
          "Failed to complete server registration.";
        if (Array.isArray(serverError)) {
          serverError = serverError.map((err) => err.message).join(", ");
        }

        // CRITICAL: Throwing stops execution here and sends the error to the form's catch block!
        throw new Error(serverError);
      }

      // This code ONLY runs if response.ok is true
      const savedHospital = data.hospital || data;

      setHospitals((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return [...safePrev, savedHospital];
      });

      return savedHospital;
    } catch (error) {
      console.error("Backend addHospital execution failed:", error);
      throw error; // Pass the error up to AddHospital.jsx
    }
  };

  // 3. DELETE Request: Remove Hospital from Database
  const deleteHospital = async (hospitalId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${hospitalId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Server declined deletion request.");
      }

      setHospitals((prev) =>
        Array.isArray(prev)
          ? prev.filter((h) => h.id !== hospitalId || h._id !== hospitalId)
          : [],
      );
      toast.success("Hospital successfully wiped from server.");
    } catch (error) {
      console.error("Backend delete mutation failed:", error);
      toast.error(error.message || "Failed to delete hospital records");
    }
  };

  // 4. PUT Request: Modify Existing Hospital Attributes
  const updateHospital = async (id, updatedFields) => {
    // Safe fallback to ensure we always have an ID, whether it comes as an argument or inside an object
    const targetId = id || updatedFields?.id || updatedFields?._id;

    if (!targetId) {
      console.error("Update aborted: No target hospital ID provided.");
      toast.error("Critical error: Missing hospital identifier.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/hospital-update/${targetId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFields),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Server declined data update.");
      }

      // Extract the fresh document instance returned by your database controller route
      const freshData = data.hospital || data.data || data;

      setHospitals((prev) =>
        Array.isArray(prev)
          ? prev.map((h) =>
              h.id === targetId || h._id === targetId
                ? { ...h, ...freshData } // Merge the update safely so layout references stay intact
                : h,
            )
          : [],
      );

      // Return the response so that your calling component can access the success message
      return data;
    } catch (error) {
      console.error("Backend update mutation failed:", error);
      // Rethrow the error so that your toast catch block inside HospitalDetails handles the UI response cleanly
      throw error;
    }
  };
  return (
    <HospitalContext.Provider
      value={{
        hospitals,
        loading,
        deleteHospital,
        updateHospital,
        addHospital,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

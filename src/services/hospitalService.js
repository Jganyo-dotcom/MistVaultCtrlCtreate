const BASE_URL = "https://medsec.onrender.com/api";
//const BASE_URL = "http://127.0.0.1:4444/api"

const token = localStorage.getItem("authToken");

// ✅ GET ALL
export const getHospitals = async () => {
  console.log("you can delete this");
  const res = await fetch(`${BASE_URL}/get-hospitals`);
  if (!res.ok) throw new Error("Failed to fetch hospitals");
  return res.json();
};

// ✅ GET ONE
export const getHospitalById = async (id) => {
  const res = await fetch(`${BASE_URL}/hospitals/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch hospital");

  const data = await res.json();
  return data.hospital; // 🔑 return the hospital object only
};

// ✅ UPDATE
export const updateHospital = async (id, data) => {
  const res = await fetch(`${BASE_URL}/update-hospital/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

// ✅ DELETE
export const deleteHospital = async (id, reason) => {
  const res = await fetch(`${BASE_URL}/update-hospital/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) throw new Error("Delete failed");
  return res.json();
};

import toast from "react-hot-toast";

export const sendNotification = async (hospitalId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/send-hospital-details/${hospitalId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Notification failed");
    }

    const data = await response.json();

    // ✅ Success toast
    toast.success(data.message || "Notification sent successfully");
    return data;
  } catch (err) {
    console.error("Error sending notification:", err);

    // ❌ Error toast
    toast.error(err.message || "Failed to send notification");
    return null;
  }
};

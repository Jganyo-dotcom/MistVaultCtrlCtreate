const BASE_URL = "https://medsec.onrender.com/api";
//const BaseApi = "http://127.0.0.1:4444/api"

// ✅ GET ALL
export const getHospitals = async () => {
  const res = await fetch(`${BASE_URL}/get-hospitals`);
  if (!res.ok) throw new Error("Failed to fetch hospitals");
  return res.json();
};

// ✅ GET ONE
export const getHospitalById = async (id) => {
  const token = localStorage.getItem("authToken");

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

const BASE_URL = "http://medsec.onrender.com/api";

// ✅ GET ALL
export const getHospitals = async () => {
  const res = await fetch(`${BASE_URL}/get-hospitals`);
  if (!res.ok) throw new Error("Failed to fetch hospitals");
  return res.json();
};

// ✅ GET ONE
export const getHospitalById = async (id) => {
  const res = await fetch(`${BASE_URL}/get-hospital/${id}`);
  if (!res.ok) throw new Error("Failed to fetch hospital");
  return res.json();
};

// ✅ UPDATE
export const updateHospital = async (id, data) => {
  const res = await fetch(`${BASE_URL}/update-hospital/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

// ✅ DELETE
export const deleteHospital = async (id, reason) => {
  const res = await fetch(`${BASE_URL}/update-hospital/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reason })
  });

  if (!res.ok) throw new Error("Delete failed");
  return res.json();
};
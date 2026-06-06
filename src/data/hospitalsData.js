// Base API URL
//const BASE_URL = "https://medsec.onrender.com/api";
const BaseApi = "http://127.0.0.1:4444/api"

// ✅ GET ALL Hospitals
export const hospitalsData = async () => {
  // Get token from localStorage
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${BASE_URL}/get-hospitals`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔑 attach token
    },
    credentials: "include", // if backend uses cookies too
  });

  if (!res.ok) throw new Error("Failed to fetch hospitals");

  const data = await res.json();
  console.log(data.message || data.error);

  return data.hospitals; // 🔑 return only the hospitals array
};

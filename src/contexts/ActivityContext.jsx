import React, { createContext, useState, useEffect } from "react";

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      hospital: "City Hospital",
      description: "was added",
      timestamp: new Date()
    }
  ]);

  // 🔥 REAL-TIME SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      const hospitals = ["MedCare", "City Hospital", "LifePlus", "Green Clinic"];

      const randomHospital =
        hospitals[Math.floor(Math.random() * hospitals.length)];

      const newLog = {
        id: Date.now(),
        hospital: randomHospital,
        description: "updated patient records",
        timestamp: new Date()
      };

      setLogs((prev) => [...prev, newLog]);
    }, 5000); // every 5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <ActivityContext.Provider value={{ logs }}>
      {children}
    </ActivityContext.Provider>
  );
};
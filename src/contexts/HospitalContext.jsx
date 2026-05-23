import React, { createContext, useState } from "react";
import { hospitalsData } from "../data/hospitalsData";

export const HospitalContext = createContext();

export function HospitalProvider({ children }) {
  const [hospitals, setHospitals] = useState(hospitalsData);

  const deleteHospital = (hospitalId) => {
    setHospitals((prev) =>
      prev.filter((hospital) => hospital.id !== hospitalId),
    );
  };

  const updateHospital = (updatedHospital) => {
    setHospitals((prev) =>
      prev.map((hospital) =>
        hospital.id === updatedHospital.id
          ? { ...hospital, ...updatedHospital }
          : hospital,
      ),
    );
  };

  const addHospital = (newHospital) => {
    setHospitals((prev) => [...prev, newHospital]);
  };

  return (
    <HospitalContext.Provider
      value={{ hospitals, deleteHospital, updateHospital, addHospital }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

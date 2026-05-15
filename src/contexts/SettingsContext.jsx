import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [user, setUser] = useState({
    name: "Ademola Toheeb",
    email: "ademola@example.com",
    phone: "+234 800 000 0000",
    twoFA: false
  });

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <SettingsContext.Provider value={{ user, updateUser }}>
      {children}
    </SettingsContext.Provider>
  );
}
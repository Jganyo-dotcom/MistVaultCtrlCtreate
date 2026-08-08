import React from "react";
import "./App.css";
//yh
import AppRoutes from "./Routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <div className="app">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "10px",
              fontSize: "14px",
            },
            success: {
              icon: "OK",
            },
            error: {
              icon: "X",
            },
          }}
        />

        <AppRoutes />
      </div>
    </SettingsProvider>
  );
}

export default App;

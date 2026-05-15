import React from "react";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { SettingsProvider } from "./contexts/SettingsContext"; // ✅ ADD

function App() {
  return (
    <SettingsProvider> {/* ✅ WRAP EVERYTHING */}
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
              icon: "✅",
            },
            error: {
              icon: "❌",
            },
          }}
        />

        <AppRoutes />
      </div>
    </SettingsProvider>
  );
}

export default App;
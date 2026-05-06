import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ActivityProvider } from './contexts/ActivityContext';
import { HospitalProvider } from './contexts/HospitalContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ActivityProvider>
        <HospitalProvider>
          <App />
        </HospitalProvider>
      </ActivityProvider>
    </BrowserRouter>
  </StrictMode>,
);

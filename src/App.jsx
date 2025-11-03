import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './routes/Dashboard.jsx';
import FoodLogger from './routes/FoodLogger.jsx';
import Recommendations from './routes/Recommendations.jsx';
import AdminPanel from './routes/AdminPanel.jsx';

export default function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food-logger" element={<FoodLogger />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<div className="p-8">Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpeg"; // ✅ Correctly import your image

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50"
  }`;

export default function Navbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img
            src={logo} // ✅ Use imported image
            alt="Diet Balancer Logo"
            className="h-8 w-8 object-contain rounded-full"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="text-xl font-semibold text-blue-700">
            Diet Balancer
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-2">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/food-logger" className={linkClass}>
            Food Logger
          </NavLink>
          <NavLink to="/recommendations" className={linkClass}>
            Recommendations
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
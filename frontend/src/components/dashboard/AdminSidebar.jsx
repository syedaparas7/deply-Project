import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-heading">
        Task Flow
      </div>

      <div className="sidebar-links">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
          exact // Add the exact prop
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="employees"
          className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink
          to="projects"
          className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
        >
          <FaProjectDiagram />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="settings"
          className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
        >
          <FiSettings />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
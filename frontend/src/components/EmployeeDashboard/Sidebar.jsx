import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import "./Sidebar.css";
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const {user} = useAuth()
  return (
    <div className="sidebar">
      <div className="sidebar-heading">
        Task Flow
      </div>

      <div className="sidebar-links">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`profile/${user._id}`}
          className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="project"
          className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
        >
          <FaProjectDiagram />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="setting"
          className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
        >
          <FiSettings />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
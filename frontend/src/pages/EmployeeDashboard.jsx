import React from 'react';
import Sidebar from '../components/EmployeeDashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import './EmployeeDashboard.css'; 
import Navbar from '../components/dashboard/Navbar';


const EmployeeDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar /> 
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
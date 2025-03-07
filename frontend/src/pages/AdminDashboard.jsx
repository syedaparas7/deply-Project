import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import './AdminDashboard.css'; 
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="dashboard-content">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

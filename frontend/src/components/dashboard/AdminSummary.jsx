import React from 'react'
import './AdminSummary.css'
import SummaryCard from './SummaryCard'
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaProjectDiagram, FaUsers } from 'react-icons/fa'



const AdminSummary = () => {
  return (
    <div className="admin-summary">
      <h3>Dashboard Overview</h3>
      <div className="summary-cards-container">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={8} bgColor="#17a2b8" />
        <SummaryCard icon={<FaProjectDiagram />} text="Total Projects" number={5} bgColor="#ffc107" />
      </div>

      <h4>Project Details</h4>
      <div className="summary-cards-container">
        <SummaryCard icon={<FaHourglassHalf />} text="Pending Projects" number={2} bgColor="#fd7e14" />
        <SummaryCard icon={<FaCheckCircle />} text="Completed Projects" number={4} bgColor="#28a745" />
        <SummaryCard icon={<FaHourglassHalf />} text="In Progress" number={2} bgColor="#dc3545" />
      </div>
    </div>
  )
}

export default AdminSummary

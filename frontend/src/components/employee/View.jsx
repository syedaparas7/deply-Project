import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './View.css'; // Ensure this CSS file exists
const VITE_API_URL = import.meta.env.VITE_API_URL;


const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null); // State for error message


  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        );
        console.log(response.data);
        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          setError(response.data.error || 'Failed to fetch employee.'); // Set error message
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError('Error fetching employee. Please check console.'); // Set a general error
      }
    };
    fetchEmployee();
  }, [id]);  // Add `id` to the dependency array

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employee) {
    return <div>Loading...</div>; // Return a loading indicator if employee is null
  }

  return (
    <div className="employee-details-container">
      <div className="details-heading">Employee Details</div>
      <div className="details-content">
        <div className="detail-row">
          <div className="detail-label">Name:</div>
          <div className="detail-value">{employee?.userId?.name || "N/A"}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Designation:</div>
          <div className="detail-value">{employee?.designation || "N/A"}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Employee ID:</div>
          <div className="detail-value">{employee?.employeeId || "N/A"}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Date of Birth:</div>
          <div className="detail-value">
            {employee?.dob ? moment(employee.dob).format('YYYY-MM-DD') : "N/A"}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Project:</div>
          <div className="detail-value">{employee?.project?.project_name || "N/A"}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Deadline:</div>
          <div className="detail-value">
            {employee?.project?.deadline ? moment(employee.project.deadline).format('DD-MM-YYYY') : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
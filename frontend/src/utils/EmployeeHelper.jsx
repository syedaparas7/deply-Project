import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import React from 'react'; // Import React
import axios from "axios";

 export const columns = [
  {
  name: "S No",
  selector: (row) => row.sno,
  width: "70px"
  },

  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  width: "100px"


  },

  {
    name: "Project",
    selector: (row) => row.project_name,
    sortable: true,
  width: "250px"


  },

  {
    name: "Deadline",
    selector: (row) => row.deadline,
    sortable: true,
     width: "120px"


  },

  {
    name: "Action",
    selector: (row) => row.action,
  width: "280px",
  center: "true"
    
  }
]


 export const fetchProjects = async () => {
  let projects
  try {
    const response = await axios.get('http://localhost:5000/api/projects', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.data.success) {
    projects = response.data.projects
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {  // Added check for error.response.data
      alert(error.response.data.error);
    } else {
      console.error('Error fetching projects data:', error); // More general error logging
      alert('An unexpected error occurred while fetching projects.'); // User-friendly message
    }
  } 
  return projects
};
  

export const EmployeeButtons = ({ _id, onEmployeeDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (_id) => {
      const confirm = window.confirm("Do you want to delete?");
      if (confirm) {
          try {
              const response = await axios.delete(`http://localhost:5000/api/employee/${_id}`, { // CORRECTED API URL
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              });
              if (response.data.success) {
                  onEmployeeDelete(_id);
              } else {
                  alert(response.data.message || "Failed to delete employee"); // Display server message if deletion fails
              }
          } catch (error) {
              console.error('Error deleting employee:', error); // Log the error
              if (error.response && error.response.data && error.response.data.error) { // Added check for error.response.data
                  alert(error.response.data.error);
              } 
          }
      }
  };

 return (
  
<div style={{ width: '550px', display: 'flex', justifyContent: 'flex-start',gap: '4px', margin: '18px' }}>
      <button
        style={{
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
          backgroundColor: '#007bff',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '1px',
          transition: 'background-color 0.2s ease' // Smooth transition
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        <FaEdit />
        Edit
      </button>

      <button
        style={{
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
          backgroundColor: '#28a745', // Example: Green for "View"
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '1px',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')} // Darker green on hover
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
        onClick={() => navigate(`/admin-dashboard/employee/view/${_id}`)}  // Replace with appropriate view action
      >
        <FaEye style={{ color: 'orange' }} />  {/* Orange View Icon */}
        View
      </button>

      <button
        style={{
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
          backgroundColor: '#dc3545',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '1px',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
        onClick={() => handleDelete(_id)}
      >
        <FaTrashAlt />
        Delete
      </button>
    </div>
  );
};
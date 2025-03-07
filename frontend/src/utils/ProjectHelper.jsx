import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export const columns = [
  {
  name: "S No",
  selector: (row) => row.sno,
  width: "60px"
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
  width: "200px"

  },

  {
    name: "Action",
    selector: (row) => row.action,
  width: "290px",
  center: "true"

  }
]

export const ProjectButtons = ({_id, onProjectDelete}) => {
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?")
    if (confirm) {
    try {
      const response = await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        onProjectDelete(_id)
      }
    } catch (error) {
      if (error.response && !error.response.data.error) {
        alert(error.response.data.error);
      } else {
        console.error('Error fetching projects:', error);
      }
    }
  }
}
 return (
  
<div style={{ width: '280px',display: 'flex',  gap: '10px', margin: '20px' }}>
  <button
    style={{
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      backgroundColor: '#007bff',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '3px'
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
    onClick={() => navigate(`/admin-dashboard/project/${_id}`)}
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
        onClick={() => navigate(`/admin-dashboard/project/viewproject/${_id}`)}
  >
    <FaEye style={{ color: 'orange' }} /> 
    View
  </button>
  <button
    style={{
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      backgroundColor: '#dc3545',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '3px'
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
    onClick={() => handleDelete(_id)}
  >
    <FaTrashAlt />
    Delete
  </button>
</div>
 )
}


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeProject.css';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const EmployeeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.success) {
          setProjects(response.data.projects);
        } else {
          setError(response.data.error || 'Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Server error while fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleViewProject = (id) => {
    navigate(`/employee-dashboard/project/${id}`);
  };

  if (loading) {
    return <div className="project-details-container">Loading projects...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="project-details-container">
      <h2 className="project-heading">My Projects</h2>
      <div className="project-content" style={{ width: '100%', maxWidth: '800px' }}>
        {projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Project Name</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid #ddd' }}>Deadline</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid #ddd' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td style={{ padding: '15px 10px', borderBottom: '1px solid #ddd' }}>{project.project_name}</td>
                  <td style={{ textAlign: 'center', padding: '15px 10px', borderBottom: '1px solid #ddd' }}>
                    {new Date(project.deadline).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'center', padding: '15px 10px', borderBottom: '1px solid #ddd' }}>
                    <button
                      onClick={() => handleViewProject(project._id)}
                      style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeProjects;
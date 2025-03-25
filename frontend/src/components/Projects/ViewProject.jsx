import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './View.css'; // Your updated CSS file

const API_URL = import.meta.env.VITE_API_URL;


const ViewProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log("Fetched project:", response.data);
        if (response.data.success) {
          setProject(response.data.project);
        } else {
          setError(response.data.error || 'Failed to fetch project details.');
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError('Server error while fetching project details.');
      }
    };

    fetchProject();
  }, [id]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!project) {
    return <div className="project-details-container">Loading...</div>;
  }

  return (
    <div className="project-details-container">
      <h2 className="project-heading">Project Details</h2>
      <div className="project-content">
        <div className="project-detail-row">
          <span className="project-detail-label">Project Name:</span>
          <span className="project-detail-value">{project.project_name || 'N/A'}</span>
        </div>
        <div className="project-detail-row">
          <span className="project-detail-label">Description:</span>
          <span className="project-detail-value">{project.description || 'N/A'}</span>
        </div>
        <div className="project-detail-row">
          <span className="project-detail-label">Deadline:</span>
          <span className="project-detail-value">
            {project.deadline ? moment(project.deadline).format('DD-MM-YYYY') : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
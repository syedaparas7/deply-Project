import React, { useState, useEffect } from 'react'
import { useParams,  useNavigate } from 'react-router-dom'
import axios from 'axios'
import './EditProject.css'

const API_URL = import.meta.env.VITE_BACKEND_URL;

const EditProject = () => {
  const {id} = useParams()
  const [project, setProject] = useState([]);
  const [projLoading, setProjLoading] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchProjects = async () => {
      setProjLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
         setProject(response.data.project)
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          alert(error.response.data.error);
        } else {
          console.error('Error fetching projects:', error);
        }
      } finally {
        setProjLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setProject({ ...project, [name]: value })
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`${API_URL}/api/projects/${id}`, project, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.data.success) {
        navigate("/admin-dashboard/projects")
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }
  return (
    <>
    {projLoading ? (<div>Loading....</div>) :
      <div className="add-projects-page"> 
      <div className="form-container">
        <h3 className="form-title">Edit Project</h3> 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="project_name">Project Name</label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              value={project.project_name}
              onChange={handleChange}
              placeholder="Enter Project Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={project.description}
              placeholder="Description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={project.deadline}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="add-project-button"> 
            Edit Project
          </button>
        </form>
      </div>
    </div>
    }
    </>
  );
};

export default EditProject

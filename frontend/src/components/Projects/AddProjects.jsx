import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './AddProjects.css'

const AddProjects = () => {
  const [project, setProject] = useState({
    project_name: '',
    description: '',
    deadline: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setProject({ ...project, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/projects/add", project, {
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
    <div className="add-projects-page"> 
      <div className="form-container">
        <h3 className="form-title">Add Project</h3> 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="project_name">Project Name</label>
            <input
              type="text"
              id="project_name"
              name="project_name"
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
              placeholder="Description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              name="deadline"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="add-project-button"> 
            Add Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProjects
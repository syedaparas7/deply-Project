import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';
import DataTable from 'react-data-table-component';
import { columns, ProjectButtons } from '../../utils/ProjectHelper';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [projLoading, setProjLoading] = useState(false);

  const onProjectDelete = async (id) => {
    const data =  projects.filter(proj => proj._id !== id)
    setProjects(data)
  }

  useEffect(() => {
    const fetchProjects = async () => {
      setProjLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/projects', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.projects.map((proj) => ({
            _id: proj._id,
            sno: sno++,
            project_name: proj.project_name,
            deadline: proj.deadline,
            action: (
              <ProjectButtons _id={proj._id} onProjectDelete={onProjectDelete}/>
            )
          }));
          setProjects(data);
          setFilteredProjects(data);

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


  const filterProjects = (e) => {
    const records = projects.filter((proj) => 
    proj.project_name.toLowerCase().includes (e.target.value.toLowerCase()))
    setFilteredProjects(records)
  }

  return (
    <>
      {projLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="project-list-container">
          <div className="project-list-header">
            <h3>Manage Projects</h3>
          </div>

          <div className="project-list-actions">
            <input
              type="text"
              placeholder="Search by Project Name"
              onChange={filterProjects}
              className="search-input"
            />
            <Link to="/admin-dashboard/add-projects" className="add-project-link">
              Add New Project
            </Link>
          </div>
          <div>
            <DataTable columns={columns} data={filteredProjects} pagination/>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList;

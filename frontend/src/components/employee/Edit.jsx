// Edit.jsx
import React, { useEffect, useState } from "react";
import "./Add.css";
import { fetchProjects } from "../../utils/EmployeeHelper";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: '',
    employeeId: '',
    dob: '',
    role: '',
    designation: '',
    project: '',
  });
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getprojects = async () => {
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      }
    };
    getprojects();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          const { userId, employeeId, dob, designation, project } = response.data.employee;
          setEmployee({
            name: userId.name,
            employeeId: employeeId,
            dob: dob,
            role: userId.role,
            designation: designation,
            project: project ? project._id : null  // Store only the project ID
          });
        } else {
          alert(response.data.error || 'Failed to fetch employee.');
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Error fetching employee. Please check console.');
      } finally {
        setLoading(false); // Set loading to false when data is fetched or an error occurs
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/api/employee/${id}`,
        {...employee, project: employee.project},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
         const updatedEmployee = response.data.employee
            setEmployee((prev) => ({...prev, 
              name: updatedEmployee.userId.name, 
              employeeId: updatedEmployee.employeeId,
              dob: updatedEmployee.dob,
              role: updatedEmployee.userId.role,
              designation: updatedEmployee.designation,
              project: updatedEmployee.project,
              deadline: updatedEmployee.deadline
        }))
        navigate('/admin-dashboard/employees')
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      if (error.response) {
        alert(error.response.data.error || "An error occurred");
      } else {
        alert("Network error or server unavailable");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="add-employee-page">
      <div className="form-container1">
        <h3 className="form-title1">Edit Employee</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Insert Name"
              required
            />
          </div>

          <div className="form-group1">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={employee.employeeId}
              onChange={handleChange}
              placeholder="Employee ID"
              required
            />

            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={employee.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group1">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={employee.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group1">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              placeholder="Designation"
              required
            />

            <label htmlFor="project">Project</label>
            <select
              id="project"
              name="project"
              value={employee.project ? employee.project : ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Project</option>
              {projects && projects.map(proj => (
                <option key={proj._id} value={proj._id}>
                  {proj.project_name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button1">
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
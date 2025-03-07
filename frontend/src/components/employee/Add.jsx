import React, { useEffect, useState } from "react";
import "./Add.css";
import { fetchProjects } from "../../utils/EmployeeHelper";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Add = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        employeeId: '',
        dob: '',
        role: '',
        designation: '',
        project: '',
        password: ''
    }); // Initialize all fields
    const navigate = useNavigate();

    useEffect(() => {
        const getprojects = async () => {
            try {
                const projectsData = await fetchProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
                // Optionally set projects to an empty array or display an error message
                setProjects([]);
            }
        };
        getprojects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;  // No files here
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/employee/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            } else {
                // Handle server-side validation errors
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

    return (
        <div className="add-employee-page">
            <div className="form-container1">
                <h3 className="form-title1">Add New Employee</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group1">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Insert Name"
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Insert Email"
                            required
                        />
                    </div>

                    <div className="form-group1">
                        <label htmlFor="employeeId">Employee ID</label>
                        <input
                            type="text"
                            id="employeeId"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            placeholder="Employee ID"
                            required
                        />

                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group1">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
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
                            value={formData.designation}
                            onChange={handleChange}
                            placeholder="Designation"
                            required
                        />

                        <label htmlFor="project">Project</label>
                        <select
                            id="project"
                            name="project"
                            value={formData.project}
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

                    <div className="form-group1">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button1">
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Add;
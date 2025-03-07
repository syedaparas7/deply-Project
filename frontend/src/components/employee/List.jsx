import React, { useEffect, useState } from 'react';
import './List.css';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import moment from 'moment';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reload, setReload] = useState(false); // Add a reload state

  const onEmployeeDelete = async (id) => {
    try {
      // Optimistically update the state before deleting
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));

      // Delete the employee from the backend
      const response = await axios.delete(`http://localhost:5000/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.data.success) {
        console.error('Failed to delete employee:', response.data.message);
        alert(response.data.message || 'Failed to delete employee.');
        // If deletion fails on the backend, revert the optimistic update
        // Refetch the employees to restore the deleted one.
        setReload(prev => !prev); // Trigger a re-fetch of employees
      } else {
        console.log('Employee deleted successfully');
        // No need to manually update state here; optimistic update is fine if the backend succeeds.
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('An error occurred while deleting the employee. Please check the console.');
       // If deletion fails on the backend, revert the optimistic update
       setReload(prev => !prev); // Trigger a re-fetch of employees
    }
  };


  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            project_name: emp.project?.project_name || 'N/A',

            name: emp.userId.name,
            deadline: emp.project?.deadline ? moment(emp.project?.deadline).format('YYYY-MM-DD') : 'N/A',
            action: (
              <EmployeeButtons _id={emp._id} onEmployeeDelete={onEmployeeDelete} />
            )
          }));
          setEmployees(data);

        } else {
          console.error('Failed to fetch employees:', response.data.message);
          alert(response.data.message || "Failed to fetch employees.  Please check the console for details.");
        }
      } catch (error) {
        console.error('Error fetching employees:', error);

        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert('An unexpected error occurred while fetching employees. Please check the console for details.');
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, [reload]);  // Added reload dependency - crucial part


  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="project-list-container1">
      <div className="project-list-header1">
        <h3>Manage Employees</h3>
      </div>

      <div className="project-list-actions1">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="search-input1"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Link to="/admin-dashboard/add-employee" className="add-project-link1">
          Add New Employee
        </Link>
      </div>
      <div className="data-table-wrapper">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          progressPending={empLoading}
          pagination
        />
      </div>
    </div>
  );
};

export default List;
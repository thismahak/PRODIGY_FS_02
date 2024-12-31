// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch employees data from the backend API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage

        if (!token) {
          setError('No token found, please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/employees', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if(response.status === 200){
          setEmployees(response.data);
        } // Set employee data
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Failed to fetch employee data.'); // Show error message
      }
    };

    fetchEmployees();
  }, []);

  // Handle delete employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
      setError('Please login first');
      return;
    }
      try {
        const response = await axios.delete(`http://localhost:5000/api/employees/delete/${id}` , 
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
            },
          }
        );
        if (response.status === 200) {
          // Remove the deleted employee from the list
          setEmployees(employees.filter((employee) => employee._id !== id));
        }
      } catch (error) {
        setError('Failed to delete employee.');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Employee Dashboard</h1>
      {error && <div className="error-message">{error}</div>}
      <button className="add-btn" onClick={() => navigate('/add-employee')}>Add New Employee</button>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-employee/${employee._id}`)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

// src/pages/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    position: '',
    salary: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
    if (error) {
      setError(''); // Clear error when user modifies input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!employeeData.name || !employeeData.email || !employeeData.position || !employeeData.salary) {
      setError('All fields are required.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login first');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/employees/create',
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        alert('Employee added successfully!');
        setEmployeeData({ name: '', email: '', position: '', salary: '' });
        setError('');
        
        setTimeout(() => {
          navigate('/dashboard'); // Redirect after a short delay to let alert show
        }, 500); // Delay for alert visibility
      }
    } catch (error) {
      console.error('Error creating employee:', error);
  
      if (error.response && error.response.status === 401) {
        setError('Your session has expired. Please log in again.');
        localStorage.removeItem('token'); // Clear token
        navigate('/login'); // Redirect to login
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Use server-provided error message
      } else {
        setError('An unexpected error occurred. Please try again later.');
      } 
  
    }
    finally {
      setIsLoading(false); // Set loading to false after request is completed
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={employeeData.name} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={employeeData.email} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-field">
          <label htmlFor="position">Position</label>
          <input 
            type="text" 
            id="position" 
            name="position" 
            value={employeeData.position} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-field">
          <label htmlFor="salary">Salary</label>
          <input 
            type="number" 
            id="salary" 
            name="salary" 
            value={employeeData.salary} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="submit-btn">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;

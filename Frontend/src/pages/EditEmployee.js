// src/pages/EditEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    position: '',
    salary: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage

        if (!token) {
          setError('No token found, please log in again.');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/employees/${id}` , 
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
            },
          }
        );
        if (response.status === 200) {
          setEmployeeData(response.data);
        } else {
          setError('Unexpected response from the server.');
        }
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch employee: ${error.response.data.message || 'Unknown error'}`);
        } else {
          setError('Failed to fetch employee: Network error');
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get token from localStorage

  if (!token) {
    setError('Please login first');
    return;
  }
    try {
      const response = await axios.put(`http://localhost:5000/api/employees/update/${id}`, employeeData , 
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        }
      );
      if(response.status == 200){
        alert('Employee details updated successfully!')
        navigate('/dashboard');
      }
      else {
        setError('Failed to update employee: Unexpected response');
      }
    } catch (error) {
      if (error.response) {
        setError(`Failed to update employee: ${error.response.data.message || 'Unknown error'}`);
      } else {
        setError('Failed to update employee: Network error');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Employee</h2>
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
        <button type="submit" className="submit-btn">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;

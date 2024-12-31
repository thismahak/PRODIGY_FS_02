// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css';

const Login = ({setIsLoggedIn}) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validation schema for the login form using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required'),  // Field name changed to 'username'
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  // Handle login submission
  const handleLogin = async (values) => {
    try {
      // Send login data to the backend
      const response = await axios.post('http://localhost:5000/api/admin/login', values);
      console.log('Response:', response); // Log the response from the backend
  
      // Check if the token is returned
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store the token in localStorage
        setIsLoggedIn(true);
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        setError('Login failed. No token returned.');
      }
    } catch (error) {
      console.error('Login error:', error); // Log any error
      if (error.response && error.response.data) {
        setError(error.response.data.message); // Display error message from backend
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>} {/* Error message */}
        <Formik
          initialValues={{ username: '', password: '' }}  // Changed 'email' to 'username'
          validationSchema={validationSchema}
          onSubmit={handleLogin} // Handle form submission
        >
          <Form>
            <div className="form-field">
              <label htmlFor="username">Username</label>  {/* Field name changed to 'username' */}
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" className="submit-btn">Login</button> {/* Styled button */}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

import React from 'react';
import { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import './App.css'; // Import the updated CSS

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status whenever localStorage changes
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update state based on token presence
  };

  // Effect hook that runs once and adds an event listener for localStorage changes
  useEffect(() => {
    checkLoginStatus(); // Check on first render
    window.addEventListener('storage', checkLoginStatus); // Listen for localStorage changes

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []); // Empty dependency array to run only once

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token on logout
    setIsLoggedIn(false); // Update state to reflect logout
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Router>
      <div className="app-wrapper">
        {/* Header */}
        <header className="app-header">
  <h1>Employee Management System</h1>
  {/* Conditionally render the Dashboard and Logout buttons */}
  {isLoggedIn && (
    <div className="header-buttons">
      {/* Dashboard Link */}
      <Link to="/dashboard" className="dashboard-link">
        <button className="dashboard-btn">
          Dashboard
        </button>
      </Link>
      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )}
</header>


        {/* Main Layout */}
        <div className="main-container">
          

          {/* Main Content */}
          <main className="content-area">
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              />
              <Route
                path="/add-employee"
                element={<PrivateRoute element={<AddEmployee />} />}
              />
              <Route
                path="/edit-employee/:id"
                element={<PrivateRoute element={<EditEmployee />} />}
              />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <p>&copy; 2024 Employee Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

# **Employee Management System - PRODIGY_FS_02**

Welcome to the **Employee Management System** repository. This project was built as part of my **Full Stack Internship** and showcases a full-stack application for managing employee data with secure user authentication.

The system allows for **admin-level authentication**, employee data management (CRUD), and **role-based access control** using **JWT** for secure login. The application is built with **Node.js**, **Express**, **MongoDB**, and **React.js** for the frontend.

---

## **Project Overview**

This **Employee Management System** provides a user-friendly interface for **admin users** to manage employee records and access protected routes. The system includes functionalities like:

- **User Authentication (Login/Logout)** using **JWT**
- **Employee CRUD Operations** (Create, Read, Update, Delete)
- **Admin Dashboard** with a table to display employee records
- **Protected Routes** to secure sensitive data

---

## **Tech Stack**

- **Frontend**: 
  - React.js
  - Axios (for API calls)
  - CSS for styling
- **Backend**: 
  - Node.js
  - Express.js
  - Mongoose (for MongoDB)
- **Database**: MongoDB (cloud-based or local)
- **Authentication**: JWT (JSON Web Tokens)

---

## **Features Implemented**

### **Backend (API)**

- **RESTful APIs for CRUD Operations**:
  - **Create**: Add new employee records.
  - **Read**: Fetch all employees or a specific employee's details.
  - **Update**: Modify existing employee records.
  - **Delete**: Remove employee records from the database.

- **Authentication**:
  - **JWT Authentication**: Users can log in to access the dashboard and perform CRUD operations.
  - **Protected Routes**: Admin routes are protected and require a valid JWT token for access.

- **Data Validation**:
  - Using **express validations** to ensure that employee data and other inputs are valid.

### **Frontend (User Interface)**

- **Login Page**:
  - Simple form for admin login.
  - Saves JWT token in `localStorage` upon successful login.

- **Dashboard**:
  - Displays employee records in a table with options to:
    - **Add Employee**: Form for adding new employee details (Name, Email, Position, Salary).
    - **Edit Employee**: Update employee information.
    - **Delete Employee**: Remove employee records with a confirmation prompt.

---

## **How to Run This Project Locally**

### **Prerequisites**

- **Node.js** and **npm** (Node Package Manager) must be installed on your machine.
- **MongoDB** should be running locally or you can use a cloud-based MongoDB service like **MongoDB Atlas**.

### **Steps to Run the Backend**

1. Clone the repository:
   ```bash
   git clone https://github.com/thismahak/PRODIGY_FS_02.git
   cd PRODIGY_FS_02
### **Install backend dependencies:**

- npm install
### **Set up environment variables in .env:**

- MONGODB_URI=your-mongodb-uri
- JWT_SECRET=your-jwt-secret
### **Start the backend server:**

- npm start
- The backend will be running at http://localhost:5000.
### **Running the Frontend:**
- *Navigate to the frontend folder:*

  - cd frontend
    
- *Install frontend dependencies:*

  - npm install
- *Start the frontend server:*

  - npm start
  - *The frontend will be available at http://localhost:3000.*
### **You can manually add admin username and hashed password on your mongodb database to test the functionality on your system**

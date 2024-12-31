const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const dbConnect = require('./config/db');
dbConnect();

const employeeRoutes = require('./routes/employeeRoutes');
const loginRoute = require('./routes/loginRoute');
const handleError = require('./Middlewares/handleError');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Use morgan for logging
app.use(morgan('dev'));

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/admin' , loginRoute);



app.use(handleError);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

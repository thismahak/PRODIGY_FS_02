const mongoose = require('mongoose');

// Database Connection
const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('MongoDB connected');

    }catch(error){
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the application if the connection fails
    }

};
  

module.exports = dbConnect;
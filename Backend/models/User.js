const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // Ensure username is unique
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password isn't modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});



module.exports = mongoose.model('User', userSchema);

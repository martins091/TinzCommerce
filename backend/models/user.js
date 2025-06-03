
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  phone: {
    type: String,
    default: '',
  },
  
  location: {
    type: String,
    default: '',
  },
  
  bio: {
    type: String,
    default: '',
  },
  
  profileImage: {
    type: String, // Store URL or path to the image
    default: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740',
  },
  
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
  
  password: {
    type: String,
    required: true,
  },
  
  joined: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);
module.exports = User;
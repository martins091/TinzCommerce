const jwt = require('jsonwebtoken');
const User = require('../models/user');


const protect = async (req, res, next) => {
 
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('No token found in headers');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};



const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    return next();
  }
  res.status(403).json({ message: 'Not authorized as admin' });
};


module.exports = { protect, admin };
 
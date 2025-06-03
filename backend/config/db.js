const mongoose = require('mongoose');

const connectDB = async () => {
  try {     
    await mongoose.connect(process.env.MONGODB_URI, {
      // useUnifiedTopology: tr ue,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports  = connectDB; 
 
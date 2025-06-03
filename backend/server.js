const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const corsOptions = require('./config/corsConfig');
const UserRoute = require('./routes/userRoute');
const ProductRoute = require('./routes/productRoute');
require('dotenv').config();  
const app = express();
const PORT = process.env.PORT || 3000;  

connectDB();
app.use(cors(corsOptions));
app.use(express.json());

//Routes
app.use('/api/users', UserRoute);
app.use('/api/products', ProductRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

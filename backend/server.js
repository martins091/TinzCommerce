const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const corsOptions = require('./config/corsConfig');
const UserRoute = require('./routes/userRoute');
require('dotenv').config();
 

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors(corsOptions));
app.use(express.json());

//Routes
app.use('/api/users', UserRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

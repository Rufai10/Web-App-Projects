const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cityRoutes = require('./routes/cityRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/cities', cityRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Somalia Weather Information System API' });
});


// Error handling middleware
app.use(errorHandler);

module.exports = app;

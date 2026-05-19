const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on http://0.0.0.0:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });

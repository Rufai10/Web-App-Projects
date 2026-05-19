const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a city name'],
        unique: true,
        trim: true
    },
    region: {
        type: String,
        required: [true, 'Please add a region'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('City', citySchema);

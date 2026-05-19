const mongoose = require('mongoose');

const weatherSchema = mongoose.Schema({
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add a city reference'],
        ref: 'City'
    },
    temperature: {
        type: Number,
        required: [true, 'Please add temperature']
    },
    condition: {
        type: String,
        required: [true, 'Please add weather condition']
    },
    humidity: {
        type: Number,
        required: [true, 'Please add humidity']
    },
    windSpeed: {
        type: Number,
        required: [true, 'Please add wind speed']
    },
    date: {
        type: Date,
        required: [true, 'Please add date'],
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Weather', weatherSchema);

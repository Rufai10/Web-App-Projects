const User = require('../models/User');
const City = require('../models/City');
const Weather = require('../models/Weather');

// @desc    Get system statistics
// @route   GET /api/v1/admin/stats
// @access  Private (Admin only)
const getStats = async (req, res, next) => {
    try {
        const userCount = await User.countDocuments();
        const cityCount = await City.countDocuments();
        const weatherCount = await Weather.countDocuments();

        res.json({
            users: userCount,
            cities: cityCount,
            weather: weatherCount
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Generate a weather report
// @route   GET /api/v1/admin/report
// @access  Private (Admin only)
const getReport = async (req, res, next) => {
    try {
        // Aggregate statistics for the report
        const weatherSummary = await Weather.aggregate([
            {
                $group: {
                    _id: null,
                    avgTemperature: { $avg: '$temperature' },
                    maxTemperature: { $max: '$temperature' },
                    minTemperature: { $min: '$temperature' },
                    avgHumidity: { $avg: '$humidity' },
                    avgWindSpeed: { $avg: '$windSpeed' }
                }
            }
        ]);

        const cityGroups = await Weather.aggregate([
            {
                $group: {
                    _id: '$cityId',
                    avgTemp: { $avg: '$temperature' },
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'cities',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'cityInfo'
                }
            },
            { $unwind: '$cityInfo' },
            { $sort: { avgTemp: -1 } }
        ]);

        res.json({
            summary: weatherSummary[0] || {},
            cityAverages: cityGroups
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStats,
    getReport
};

const Weather = require('../models/Weather');

// @desc    Get all weather records
// @route   GET /api/v1/weather
// @access  Protected
const getWeather = async (req, res, next) => {
    try {
        const weather = await Weather.find()
            .populate('cityId', 'name region')
            .populate('createdBy', 'name email');
        res.json(weather);
    } catch (error) {
        next(error);
    }
};

// @desc    Get weather for a specific city
// @route   GET /api/v1/weather/city/:cityId
// @access  Protected
const getWeatherByCity = async (req, res, next) => {
    try {
        const weather = await Weather.find({ cityId: req.params.cityId })
            .populate('cityId', 'name region');
        res.json(weather);
    } catch (error) {
        next(error);
    }
};

// @desc    Create weather record
// @route   POST /api/v1/weather
// @access  Private (Admin only)
const createWeather = async (req, res, next) => {
    try {
        const { cityId, temperature, condition, humidity, windSpeed, date } = req.body;

        const weather = new Weather({
            cityId,
            temperature,
            condition,
            humidity,
            windSpeed,
            date,
            createdBy: req.user._id
        });

        const createdWeather = await weather.save();
        res.status(201).json(createdWeather);
    } catch (error) {
        next(error);
    }
};

// @desc    Update weather record
// @route   PUT /api/v1/weather/:id
// @access  Private (Admin only)
const updateWeather = async (req, res, next) => {
    try {
        const weather = await Weather.findById(req.params.id);

        if (weather) {
            weather.cityId = req.body.cityId || weather.cityId;
            weather.temperature = req.body.temperature || weather.temperature;
            weather.condition = req.body.condition || weather.condition;
            weather.humidity = req.body.humidity || weather.humidity;
            weather.windSpeed = req.body.windSpeed || weather.windSpeed;
            weather.date = req.body.date || weather.date;

            const updatedWeather = await weather.save();
            res.json(updatedWeather);
        } else {
            res.status(404);
            throw new Error('Weather record not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete weather record
// @route   DELETE /api/v1/weather/:id
// @access  Private (Admin only)
const deleteWeather = async (req, res, next) => {
    try {
        const weather = await Weather.findById(req.params.id);

        if (weather) {
            await Weather.deleteOne({ _id: weather._id });
            res.json({ message: 'Weather record removed' });
        } else {
            res.status(404);
            throw new Error('Weather record not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWeather,
    getWeatherByCity,
    createWeather,
    updateWeather,
    deleteWeather
};

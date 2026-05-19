const express = require('express');
const {
    getWeather,
    getWeatherByCity,
    createWeather,
    updateWeather,
    deleteWeather
} = require('../controllers/weatherController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getWeather)
    .post(protect, authorize('Admin'), createWeather);

router.route('/city/:cityId')
    .get(protect, getWeatherByCity);

router.route('/:id')
    .put(protect, authorize('Admin'), updateWeather)
    .delete(protect, authorize('Admin'), deleteWeather);

module.exports = router;

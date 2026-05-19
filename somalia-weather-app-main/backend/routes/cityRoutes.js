const express = require('express');
const router = express.Router();
const {
    getCities,
    createCity,
    updateCity,
    deleteCity
} = require('../controllers/cityController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getCities)
    .post(protect, authorize('Admin'), createCity);

router.route('/:id')
    .put(protect, authorize('Admin'), updateCity)
    .delete(protect, authorize('Admin'), deleteCity);

module.exports = router;

const City = require('../models/City');

// @desc    Get all cities
// @route   GET /api/v1/cities
// @access  Protected
const getCities = async (req, res, next) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a city
// @route   POST /api/v1/cities
// @access  Private (Admin only)
const createCity = async (req, res, next) => {
    try {
        const { name, region } = req.body;
        const cityExists = await City.findOne({ name });

        if (cityExists) {
            res.status(400);
            throw new Error('City already exists');
        }

        const city = await City.create({ name, region });
        res.status(201).json(city);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a city
// @route   PUT /api/v1/cities/:id
// @access  Private (Admin only)
const updateCity = async (req, res, next) => {
    try {
        const city = await City.findById(req.params.id);

        if (city) {
            city.name = req.body.name || city.name;
            city.region = req.body.region || city.region;

            const updatedCity = await city.save();
            res.json(updatedCity);
        } else {
            res.status(404);
            throw new Error('City not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a city
// @route   DELETE /api/v1/cities/:id
// @access  Private (Admin only)
const deleteCity = async (req, res, next) => {
    try {
        const city = await City.findById(req.params.id);

        if (city) {
            await City.deleteOne({ _id: city._id });
            res.json({ message: 'City removed' });
        } else {
            res.status(404);
            throw new Error('City not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCities,
    createCity,
    updateCity,
    deleteCity
};

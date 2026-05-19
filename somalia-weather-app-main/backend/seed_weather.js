const mongoose = require('mongoose');
const Weather = require('./models/Weather');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedWeather = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const admin = await User.findOne({ email: 'admin@weather.com' });
        if (!admin) {
            console.error('Admin user not found. Please run seed.js first.');
            process.exit(1);
        }

        const sampleWeather = [
            { city: 'Mogadishu', temperature: 31, condition: 'Sunny', humidity: 75, windSpeed: 15, description: 'Clear skies with a pleasant sea breeze. The coastal front is vibrant and busy.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Hargeisa', temperature: 24, condition: 'Partly Cloudy', humidity: 45, windSpeed: 10, description: 'Mild weather with some cloud cover. Perfect for outdoor activities.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Garowe', temperature: 28, condition: 'Clear', humidity: 30, windSpeed: 12, description: 'Dry and sunny throughout the day. Typical highland climate.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Kismayo', temperature: 29, condition: 'Showers', humidity: 85, windSpeed: 18, description: 'High humidity with coastal winds. Greenery is lush around the port.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Baidoa', temperature: 27, condition: 'Cloudy', humidity: 60, windSpeed: 9, description: 'Overcast skies throughout the day. Significant agricultural activity noticed.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Borama', temperature: 22, condition: 'Clear', humidity: 40, windSpeed: 11, description: 'Cool and pleasant weather. The hills are mist-covered in the morning.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Bosaso', temperature: 34, condition: 'Hot', humidity: 70, windSpeed: 14, description: 'Very hot and humid conditions. The port is active in the early hours.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Galkacyo', temperature: 30, condition: 'Dusty', humidity: 25, windSpeed: 20, description: 'Dry and dusty winds expected. Visibility might be low.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Beledweyne', temperature: 32, condition: 'Sunny', humidity: 55, windSpeed: 13, description: 'Bright and hot weather. River levels are stable.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Berbera', temperature: 35, condition: 'Hot', humidity: 72, windSpeed: 16, description: 'Intense heat near the coast. High evaporation expected.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Dhusamareb', temperature: 29, condition: 'Clear', humidity: 35, windSpeed: 12, description: 'Predictable sunny conditions. Calm atmosphere.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Jowhar', temperature: 28, condition: 'Showers', humidity: 80, windSpeed: 10, description: 'Occasional rain expected. Rich soil in the riverine area.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Merca', temperature: 30, condition: 'Sunny', humidity: 78, windSpeed: 14, description: 'Sunny with moderate humidity. Ancient city vibes.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Eyl', temperature: 26, condition: 'Windy', humidity: 50, windSpeed: 25, description: 'Strong winds along the coast. High surfing potential.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Las Anod', temperature: 25, condition: 'Partly Cloudy', humidity: 42, windSpeed: 11, description: 'Mild and stable weather. Trade activities ongoing.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Erigavo', temperature: 18, condition: 'Foggy', humidity: 65, windSpeed: 8, description: 'Cool mountain air with morning fog. Highest elevation city.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Hobyo', temperature: 28, condition: 'Breezy', humidity: 70, windSpeed: 22, description: 'Steady winds from the Indian Ocean. Historic port.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Afgooye', temperature: 29, condition: 'Humid', humidity: 82, windSpeed: 9, description: 'Close to the Shabelle river. High humidity levels.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Barawe', temperature: 27, condition: 'Sunny', humidity: 76, windSpeed: 19, description: 'Bright sun and strong coastal waves.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Zeila', temperature: 33, condition: 'Hot', humidity: 68, windSpeed: 15, description: 'Arid coastal climate near the border.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Burao', temperature: 26, condition: 'Clear', humidity: 38, windSpeed: 13, description: 'Dry and moderate. Central trade hub.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Gebiley', temperature: 23, condition: 'Partly Cloudy', humidity: 50, windSpeed: 10, description: 'Agricultural heartland with mild climate.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Sheikh', temperature: 19, condition: 'Cool', humidity: 45, windSpeed: 12, description: 'Refreshing mountain climate. Historic site.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Badhan', temperature: 25, condition: 'Clear', humidity: 35, windSpeed: 11, description: 'Quiet and sunny in the Al-Madu mountains.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Qardho', temperature: 28, condition: 'Dry', humidity: 28, windSpeed: 14, description: 'Classic semi-arid weather.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Burtinle', temperature: 29, condition: 'Clear', humidity: 32, windSpeed: 13, description: 'Sunny and peaceful plateau weather.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Galdogob', temperature: 30, condition: 'Clear', humidity: 26, windSpeed: 15, description: 'Border town with dry conditions.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Jariban', temperature: 27, condition: 'Windy', humidity: 40, windSpeed: 24, description: 'Dusty winds from the interior.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Guri Ceel', temperature: 28, condition: 'Sunny', humidity: 33, windSpeed: 14, description: 'Consistent sunny weather.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Mataban', temperature: 29, condition: 'Clear', humidity: 34, windSpeed: 12, description: 'Inland sunny conditions.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Mahas', temperature: 28, condition: 'Partly Cloudy', humidity: 42, windSpeed: 11, description: 'Scattered clouds over the plains.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Buloburde', temperature: 31, condition: 'Hot', humidity: 58, windSpeed: 13, description: 'River valley heat.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Jalalaqsi', temperature: 31, condition: 'Sunny', humidity: 60, windSpeed: 10, description: 'Bright sun and river moisture.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Wanlaweyn', temperature: 30, condition: 'Humid', humidity: 72, windSpeed: 12, description: 'Transition zone humidity.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Qoryoley', temperature: 29, condition: 'Showers', humidity: 82, windSpeed: 9, description: 'Occasional light rain in farm areas.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Jilib', temperature: 28, condition: 'Overcast', humidity: 85, windSpeed: 7, description: 'Dense tropical cloud cover.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Bu\'ale', temperature: 29, condition: 'Humid', humidity: 84, windSpeed: 8, description: 'Rich riverine environment.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Sakow', temperature: 28, condition: 'Cloudy', humidity: 80, windSpeed: 10, description: 'Stable cloud presence.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Bardere', temperature: 30, condition: 'Sunny', humidity: 60, windSpeed: 12, description: 'Agricultural sunshine.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Luuq', temperature: 32, condition: 'Hot', humidity: 45, windSpeed: 14, description: 'Intense heat in the river bend.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Garbaharey', temperature: 31, condition: 'Clear', humidity: 35, windSpeed: 11, description: 'Clear and dry in the interior.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Dolow', temperature: 33, condition: 'Dry', humidity: 30, windSpeed: 15, description: 'Hot border town conditions.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Afmadow', temperature: 28, condition: 'Cloudy', humidity: 75, windSpeed: 9, description: 'Scattered rain in the savanna.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Badhadhe', temperature: 27, condition: 'Showers', humidity: 88, windSpeed: 11, description: 'Coastal forest rain.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Jamaame', temperature: 29, condition: 'Sunny', humidity: 79, windSpeed: 12, description: 'Moist and sunny coastal plains.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Adado', temperature: 30, condition: 'Clear', humidity: 28, windSpeed: 16, description: 'Central plateau heat.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Abudwak', temperature: 31, condition: 'Dusty', humidity: 25, windSpeed: 18, description: 'Dry and fast winds.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Cadaado', temperature: 29, condition: 'Sunny', humidity: 35, windSpeed: 14, description: 'Bright skies in Galmudug.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Ceel Buur', temperature: 31, condition: 'Clear', humidity: 30, windSpeed: 15, description: 'Ancient town in hot sun.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Ceel Dheer', temperature: 28, condition: 'Breezy', humidity: 65, windSpeed: 20, description: 'Coastal breeze in the morning.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Harardhere', temperature: 29, condition: 'Sunny', humidity: 60, windSpeed: 18, description: 'Vibrant sun over the coastline.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Las Khorey', temperature: 26, condition: 'Windy', humidity: 55, windSpeed: 28, description: 'Extreme coastal winds near mountains.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Bandiradley', temperature: 30, condition: 'Partly Cloudy', humidity: 32, windSpeed: 14, description: 'Transit town with fair weather.', createdBy: admin._id, forecastDate: new Date() },
            { city: 'Galdogob', temperature: 31, condition: 'Dry', humidity: 24, windSpeed: 17, description: 'Steady dry heat.', createdBy: admin._id, forecastDate: new Date() }
        ];


        await Weather.deleteMany({}); // Clear old data
        await Weather.insertMany(sampleWeather);

        console.log('Sample weather data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding weather:', error.message);
        process.exit(1);
    }
};

seedWeather();

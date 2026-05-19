const mongoose = require('mongoose');
const User = require('./models/User');
const City = require('./models/City');
const Weather = require('./models/Weather');
const dotenv = require('dotenv');

dotenv.config();

const citiesData = [
    { name: 'Mogadishu', region: 'Banaadir' },
    { name: 'Hargeisa', region: 'Woqooyi Galbeed' },
    { name: 'Garowe', region: 'Nugaal' },
    { name: 'Baidoa', region: 'Bay' },
    { name: 'Kismayo', region: 'Lower Juba' },
    { name: 'Bossaso', region: 'Bari' },
    { name: 'Galkayo', region: 'Mudug' },
    { name: 'Borama', region: 'Awdal' },
    { name: 'Beletweyne', region: 'Hiran' },
    { name: 'Berbera', region: 'Sahil' },
    { name: 'Dusamareb', region: 'Galguduud' },
    { name: 'Jowhar', region: 'Middle Shabelle' },
    { name: 'Merca', region: 'Lower Shabelle' },
    { name: 'Erigavo', region: 'Sanaag' },
    { name: 'Las Anod', region: 'Sool' },
    { name: 'Burco', region: 'Togdheer' },
    { name: 'Afgooye', region: 'Lower Shabelle' },
    { name: 'Balad', region: 'Middle Shabelle' },
    { name: 'Barawe', region: 'Lower Shabelle' },
    { name: 'Bardera', region: 'Gedo' },
    { name: 'Beled Hawo', region: 'Gedo' },
    { name: 'Buuloburde', region: 'Hiran' },
    { name: 'Ceel Bur', region: 'Galguduud' },
    { name: 'Ceelafweyn', region: 'Sanaag' },
    { name: 'Eyl', region: 'Nugaal' },
    { name: 'Gabiley', region: 'Woqooyi Galbeed' },
    { name: 'Garbaharey', region: 'Gedo' },
    { name: 'Garoowe', region: 'Nugaal' },
    { name: 'Guriel', region: 'Galguduud' },
    { name: 'Hobyo', region: 'Mudug' },
    { name: 'Jilib', region: 'Middle Juba' },
    { name: 'Lughaye', region: 'Awdal' },
    { name: 'Luuk', region: 'Gedo' },
    { name: 'Mahadday Weyne', region: 'Middle Shabelle' },
    { name: 'Qardho', region: 'Bari' },
    { name: 'Qoryoley', region: 'Lower Shabelle' },
    { name: 'Sheikh', region: 'Sahil' },
    { name: 'Taleh', region: 'Sool' },
    { name: 'Wajid', region: 'Bakool' },
    { name: 'Wanlaweyn', region: 'Lower Shabelle' },
    { name: 'Zeila', region: 'Awdal' },
    { name: 'Abudwak', region: 'Galguduud' },
    { name: 'Adado', region: 'Galguduud' },
    { name: 'Badhan', region: 'Sanaag' },
    { name: 'Banderadley', region: 'Mudug' },
    { name: 'Burtinle', region: 'Nugaal' },
    { name: 'Buurhakaba', region: 'Bay' },
    { name: 'Cadaado', region: 'Galguduud' },
    { name: 'Caynabo', region: 'Sool' },
    { name: 'Ceerigaabo', region: 'Sanaag' },
    { name: 'Dollow', region: 'Gedo' },
    { name: 'Goldogob', region: 'Mudug' },
    { name: 'Hudur', region: 'Bakool' },
    { name: 'Jariban', region: 'Mudug' },
    { name: 'Qansax Dheere', region: 'Bay' },
    { name: 'Rab Dhuure', region: 'Bakool' },
    { name: 'Xuddur', region: 'Bakool' },
    { name: 'Buur Gaabo', region: 'Lower Juba' }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // 1. Seed Admin User
        let admin = await User.findOne({ email: 'admin@weather.com' });
        if (!admin) {
            admin = await User.create({
                name: 'Admin User',
                email: 'admin@weather.com',
                password: 'password123',
                role: 'Admin'
            });
            console.log('Admin user created: admin@weather.com / password123');
        } else {
            console.log('Admin user exists.');
        }

        // 2. Seed Cities
        console.log('Seeding cities...');
        await City.deleteMany({});
        const createdCities = await City.insertMany(citiesData);
        console.log(`${createdCities.length} cities seeded successfully.`);

        // 3. Seed Weather
        console.log('Seeding initial weather data...');
        await Weather.deleteMany({});

        const weatherEntries = createdCities.map(city => ({
            cityId: city._id,
            temperature: 28 + Math.floor(Math.random() * 8),
            condition: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Windy'][Math.floor(Math.random() * 4)],
            humidity: 50 + Math.floor(Math.random() * 30),
            windSpeed: 5 + Math.floor(Math.random() * 20),
            date: new Date(),
            createdBy: admin._id
        }));

        await Weather.insertMany(weatherEntries);
        console.log('Weather data seeded successfully!');

        await mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error.message);
        process.exit(1);
    }
};

seedData();

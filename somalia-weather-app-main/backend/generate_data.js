const BASE_URL = 'http://127.0.0.1:5000/api/v1';
let token = '';

const log = (msg) => console.log(msg);

async function generateData() {
    console.log('🚀 Generating Persistent Test Data...\n');

    // 1. Login
    try {
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@weather.com', password: 'password123' })
        });
        const loginData = await loginRes.json();
        token = loginData.token;
        console.log(`🔑 Login Successful. Token obtained.`);
    } catch (e) {
        console.error('Login Failed:', e.message);
        return;
    }

    // 2. Create or Get City
    let cityId;
    try {
        let res = await fetch(`${BASE_URL}/cities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: 'Mogadishu Test', region: 'Banaadir' })
        });

        let data = await res.json();

        if (res.status === 400 && data.message === 'City already exists') {
            console.log('⚠️ City "Mogadishu Test" already exists. Fetching existing ID...');
            // Fetch all cities to find the ID
            const getRes = await fetch(`${BASE_URL}/cities`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const cities = await getRes.json();
            const existingCity = cities.find(c => c.name === 'Mogadishu Test');
            if (existingCity) {
                cityId = existingCity._id;
                console.log(`✅ Found Existing City ID: ${cityId}`);
            } else {
                console.error('❌ Could not find existing city ID despite 400 error.');
            }
        } else if (res.status === 201) {
            cityId = data._id;
            console.log(`✅ City Created: ${data.name} (ID: ${cityId})`);
        } else {
            console.error(`❌ Create City Failed (${res.status}):`, data);
        }

        console.log(`   URL: ${BASE_URL}/cities`);
    } catch (e) {
        console.error('Create City Error:', e.message);
    }

    // 3. Create Weather
    if (cityId) {
        try {
            const res = await fetch(`${BASE_URL}/weather`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    cityId: cityId,
                    temperature: 28.5,
                    condition: 'Sunny',
                    humidity: 60,
                    windSpeed: 15,
                    date: new Date().toISOString()
                })
            });
            const data = await res.json();
            console.log(`✅ Weather Created for ${data.cityId} (ID: ${data._id})`);
            console.log(`   URL: ${BASE_URL}/weather`);
        } catch (e) {
            console.error('Create Weather Failed:', e.message);
        }
    }
    console.log('\n✨ Data generation complete. No data was deleted.');
}

generateData();

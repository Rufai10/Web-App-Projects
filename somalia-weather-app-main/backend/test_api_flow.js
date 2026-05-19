const BASE_URL = 'http://127.0.0.1:5000/api/v1';
let token = '';
let testCityId = '';
let testWeatherId = '';

const log = (msg, success = true) => console.log(success ? `✅ ${msg}` : `❌ ${msg}`);

async function runTests() {
    console.log('🚀 Starting API HTTP Method Tests...\n');

    // 1. POST: Login
    try {
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@weather.com', password: 'password123' })
        });

        if (loginRes.status !== 200) throw new Error(`Login failed: ${loginRes.status}`);
        const loginData = await loginRes.json();
        token = loginData.token;
        log('POST /auth/login - Authenticated as Admin');
    } catch (e) {
        log(`Login Failed: ${e.message}`, false);
        return;
    }

    // 2. GET: Get Cities
    try {
        const res = await fetch(`${BASE_URL}/cities`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.status !== 200) throw new Error(`GET Cities failed: ${res.status}`);
        log('GET /cities - Retrieved city list');
    } catch (e) {
        log(e.message, false);
    }

    // 3. POST: Create City
    try {
        const res = await fetch(`${BASE_URL}/cities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: 'TestVille', region: 'TestRegion' })
        });
        if (res.status !== 201) throw new Error(`Create City failed: ${res.status}`);
        const data = await res.json();
        testCityId = data._id;
        log(`POST /cities - Created city 'TestVille' (ID: ${testCityId})`);
    } catch (e) {
        log(e.message, false);
    }

    // 4. POST: Create Weather
    if (testCityId) {
        try {
            const res = await fetch(`${BASE_URL}/weather`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    cityId: testCityId,
                    temperature: 25.5,
                    condition: 'Testy',
                    humidity: 50,
                    windSpeed: 10,
                    date: new Date().toISOString()
                })
            });
            if (res.status !== 201) throw new Error(`Create Weather failed: ${res.status}`);
            const data = await res.json();
            testWeatherId = data._id;
            log(`POST /weather - Added weather to TestVille (ID: ${testWeatherId})`);
        } catch (e) {
            log(e.message, false);
        }
    }

    // 5. DELETE: Delete Weather
    if (testWeatherId) {
        try {
            const res = await fetch(`${BASE_URL}/weather/${testWeatherId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status !== 200) throw new Error(`Delete Weather failed: ${res.status}`);
            log('DELETE /weather/:id - Deleted test weather record');
        } catch (e) {
            log(e.message, false);
        }
    }

    // 6. DELETE: Delete City
    if (testCityId) {
        try {
            const res = await fetch(`${BASE_URL}/cities/${testCityId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status !== 200) throw new Error(`Delete City failed: ${res.status}`);
            log('DELETE /cities/:id - Deleted test city');
        } catch (e) {
            log(e.message, false);
        }
    }

    console.log('\n✨ All tests completed.');
}

runTests();

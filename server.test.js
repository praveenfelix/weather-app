const request = require('supertest');
const app = require('./server');
const axios = require('axios');

let server;

beforeAll(() => {
    server = app.listen(3001); // Use a different port for testing
});

afterAll(() => {
    return new Promise((resolve) => {
        axios.get('http://localhost:3001/api/weather?city=test')
            .catch(() => {})
            .finally(() => {
                server.close(() => resolve());
            });
    });
});

describe('Weather API Endpoints', () => {
    test('GET /api/weather without city parameter should return 400', async () => {
        const response = await request(app)
            .get('/api/weather')
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body.error).toBe('City parameter is required');
    });

    test('GET /api/weather with invalid city should return 500', async () => {
        const response = await request(app)
            .get('/api/weather?city=InvalidCityName123456')
            .expect('Content-Type', /json/)
            .expect(500);

        expect(response.body.error).toBe('Failed to fetch weather data');
    });
}); 


/*process.env.NODE_ENV = 'test';  // Set environment to test

const request = require('supertest');
const app = require('./server'); // Import your Express app

let server;

beforeAll((done) => {
    server = app.listen(3000, () => {
        console.log('Test server started on port 3000');
        done();
    });
});

afterAll((done) => {
    server.close(() => {
        console.log('Test server closed');
        done();
    });
});

describe('Weather API Endpoints', () => {
    test('GET /api/weather without city parameter should return 400', async () => {
        const res = await request(server).get('/api/weather');
        expect(res.status).toBe(400);
    });

    test('GET /api/weather with invalid city should return 404', async () => {
        const res = await request(server).get('/api/weather?city=invalid');
        expect(res.status).toBe(404);  // Expect 404 for invalid city
    });
});
*/
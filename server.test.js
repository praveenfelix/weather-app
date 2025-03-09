const request = require('supertest');
const app = require('./server');

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
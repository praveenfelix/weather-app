/*const request = require('supertest');
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
});*/

/*const request = require('supertest');
const app = require('./server'); // Import your Express app

describe('Weather API Endpoints', () => {
    let server;

    // Start the server before tests
    beforeAll(() => {
        server = app.listen(3000); // Start the server on port 3000
    });

    // Close the server after tests
    afterAll((done) => {
        server.close(done); // Close the server and call done() to signal Jest
    });

    it('GET /api/weather without city parameter should return 400', async () => {
        const res = await request(app).get('/api/weather');
        expect(res.statusCode).toEqual(400);
    });

    it('GET /api/weather with invalid city should return 500', async () => {
        const res = await request(app).get('/api/weather?city=InvalidCity');
        expect(res.statusCode).toEqual(500);
    });
});*/

const request = require('supertest');
const app = require('./server'); // Import your Express app

describe('Weather API Endpoints', () => {
    let server;

    // Start the server before tests
    beforeAll((done) => {
        server = app.listen(3000, () => {
            console.log('Test server started on port 3000');
            done(); // Signal Jest that the server has started
        });
    });

    // Close the server after tests
    afterAll((done) => {
        server.close(() => {
            console.log('Test server closed');
            done(); // Signal Jest that the server has closed
        });
    });

    it('GET /api/weather without city parameter should return 400', async () => {
        const res = await request(app).get('/api/weather');
        expect(res.statusCode).toEqual(400);
    });

    it('GET /api/weather with invalid city should return 500', async () => {
        const res = await request(app).get('/api/weather?city=InvalidCity');
        expect(res.statusCode).toEqual(500);
    });
});
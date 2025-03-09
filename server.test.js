const request = require('supertest');
const app = require('./server'); // Import your Express app

describe('Weather API Endpoints', () => {
    let server;

    // Start the server before all tests
    beforeAll((done) => {
        if (!server) {
            server = app.listen(3000, () => {
                console.log('Test server started on port 3000');
                done(); // Signal Jest that the server has started
            });
        } else {
            done(); // If server is already running, just call done()
        }
    });

    // Close the server after all tests
    afterAll((done) => {
        if (server) {
            server.close(() => {
                console.log('Test server closed');
                done(); // Signal Jest that the server has closed
            });
        } else {
            done(); // If server is not defined, just call done()
        }
    });

    it('GET /api/weather without city parameter should return 400', async () => {
        const res = await request(app).get('/api/weather').end(); // Ensure the request is closed
        expect(res.statusCode).toEqual(400);
    });

    it('GET /api/weather with invalid city should return 500', async () => {
        const res = await request(app).get('/api/weather?city=InvalidCity').end(); // Ensure the request is closed
        expect(res.statusCode).toEqual(500);
    });
});
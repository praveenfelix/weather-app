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

    test('GET /api/weather with invalid city should return 500', async () => {
        const res = await request(server).get('/api/weather?city=invalid');
        expect(res.status).toBe(500);
    });
});

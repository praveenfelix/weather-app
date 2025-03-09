const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        const apiKey = process.env.WEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Only start the server if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app; // For testing purposes 

/*// server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;  // Use the correct variable name

// Debug log to check if API key is loaded correctly
console.log("API Key from .env:", API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ error: 'City parameter is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        res.status(200).send(response.data);
    } catch (error) {
        console.error('Error:', error.message);  // Log error message
        if (error.response) {
            console.error('Response data:', error.response.data);  // Log response data if available
        }

        if (error.response && error.response.status === 404) {
            res.status(404).send({ error: 'City not found' });
        } else if (error.response && error.response.status === 401) {  // Handle invalid API key
            res.status(401).send({ error: 'Invalid API key' });
        } else {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the server for testing
module.exports = server;
*/
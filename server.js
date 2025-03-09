const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
//const PORT = process.env.PORT || 3000;
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));






// Example route
app.get('/api/weather', (req, res) => {
    if (!req.query.city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }
    // Simulate a weather API response
    res.status(200).json({ city: req.query.city, temperature: 25 });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the server for testing
module.exports = server;

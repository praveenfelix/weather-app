async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const errorDiv = document.getElementById('error');
    
    const city = cityInput.value.trim();
    
    if (!city) {
        errorDiv.textContent = 'Please enter a city name';
        weatherInfo.innerHTML = '';
        return;
    }

    try {
        errorDiv.textContent = '';
        weatherInfo.innerHTML = 'Loading...';
        
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();
        
        if (response.ok) {
            const weather = {
                temp: Math.round(data.main.temp),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                city: data.name,
                country: data.sys.country
            };

            weatherInfo.innerHTML = `
                <h2>${weather.city}, ${weather.country}</h2>
                <div class="weather-main">
                    <p class="temperature">${weather.temp}°C</p>
                    <p class="description">${weather.description}</p>
                </div>
                <div class="weather-details">
                    <div>
                        <strong>Humidity:</strong>
                        <p>${weather.humidity}%</p>
                    </div>
                    <div>
                        <strong>Wind Speed:</strong>
                        <p>${weather.windSpeed} m/s</p>
                    </div>
                </div>
            `;
        } else {
            throw new Error(data.error || 'Failed to fetch weather data');
        }
    } catch (error) {
        errorDiv.textContent = error.message;
        weatherInfo.innerHTML = '';
    }
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});
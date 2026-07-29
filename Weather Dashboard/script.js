const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");

const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const weatherCondition = document.querySelector("#weatherCondition");
const errorMessage = document.querySelector("#errorMessage");

function getWeatherCondition(code) {

    if (code === 0) {
        return "☀️ Clear Sky";
    } 
    else if (code >= 1 && code <= 3) {
        return "☁️ Partly Cloudy";
    } 
    else if (code >= 45 && code <= 48) {
        return "🌫️ Foggy";
    } 
    else if (code >= 51 && code <= 57) {
        return "🌦️ Drizzle";
    } 
    else if (code >= 61 && code <= 67) {
        return "🌧️ Rain";
    } 
    else if (code >= 71 && code <= 77) {
        return "❄️ Snow";
    } 
    else if (code >= 80 && code <= 82) {
        return "🌧️ Rain Showers";
    } 
    else if (code >= 95 && code <= 99) {
        return "⛈️ Thunderstorm";
    } 
    else {
        return "Unknown Weather";
    }
}
async function getWeather() {

    const city = cityInput.value.trim();

    // Check for empty input
    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    try {

        // Clear previous error
        errorMessage.textContent = "";

        // Get city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        // Check if request was successful
        if (!locationResponse.ok) {
            throw new Error("Unable to find city.");
        }

        const locationData = await locationResponse.json();

        // Check if city exists
        if (!locationData.results || locationData.results.length === 0) {
            errorMessage.textContent =
                "City not found. Please enter a valid city name.";
            return;
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );

        // Check if weather request was successful
        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        const weatherData = await weatherResponse.json();

        const currentWeather = weatherData.current;

        // Display weather information
        cityName.textContent = location.name;

        temperature.textContent = currentWeather.temperature_2m;

        humidity.textContent = currentWeather.relative_humidity_2m;

        windSpeed.textContent = currentWeather.wind_speed_10m;

        weatherCondition.textContent =
            getWeatherCondition(currentWeather.weather_code);

    } 
    
    catch (error) {

        console.error("Error:", error);

        errorMessage.textContent =
            "Something went wrong. Please try again later.";
    }
}


searchButton.addEventListener("click", getWeather);
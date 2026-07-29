# 🌤️ Weather Dashboard

A responsive Weather Dashboard built using HTML, CSS, and JavaScript. The application fetches live weather data from a public REST API and dynamically displays weather information based on the city searched by the user.

## 🚀 Features

* Search weather by city name
* Fetches live weather data using the Fetch API
* Uses JavaScript `async/await`
* Displays temperature
* Displays humidity
* Displays wind speed
* Displays current weather condition
* Handles invalid city names
* Handles empty search input
* Includes network/API error handling
* Responsive design for desktop and mobile devices
* Dynamically updates weather information using JavaScript DOM manipulation

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* Fetch API
* REST API
* JSON
* Async/Await

## 📂 Project Structure

```text
weather-dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ How It Works

1. User enters a city name.
2. JavaScript sends a request to the geocoding API.
3. The API returns the city's latitude and longitude.
4. JavaScript uses these coordinates to request current weather data.
5. The JSON response is processed using JavaScript.
6. Temperature, humidity, wind speed, and weather condition are displayed dynamically.

## 🌐 API

This project uses the Open-Meteo API for geocoding and weather data.

## ▶️ How to Run

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in your browser.
4. Enter a city name.
5. Click **Search**.

## 📱 Responsive Design

The dashboard is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile devices

## 📌 Project Status

Completed ✅

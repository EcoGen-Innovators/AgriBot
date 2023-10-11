
// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = '1b731c5ea8595d02eb473392ea79108b';
let hourlyChart
// Function to fetch weather data based on city name
async function getWeatherDataByCity(cityName) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    // Update city name
    document.getElementById('cityName').textContent = data.name;

    // Update temperature
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;

    // Update precipitation (assuming "rain" property in data)
    if (data.rain && data.rain["1h"]) {
      document.getElementById('precipitation').textContent = `${data.rain["1h"]}%`;
    } else {
      document.getElementById('precipitation').textContent = '0%';
    }

    // Update wind
    document.getElementById('wind').textContent = `${data.wind.speed} m/s ${getWindDirection(data.wind.deg)}`;

    // Update humidity
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;

    // Fetch and display hourly weather chart
    getHourlyWeatherDataByCity(cityName);

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}


// Function to create an hourly temperature chart
function createHourlyChart(hourlyTemperatures) {
  const ctx = document.getElementById('hourlyChart').getContext('2d');

  // Clear the previous chart if it exists
  if (hourlyChart) {
    hourlyChart.destroy();
  }

  hourlyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: hourlyTemperatures.length }, (_, i) => i + 1), // Labels for hours (1, 2, 3, ...)
      datasets: [
        {
          label: 'Hourly Temperature (°C)',
          data: hourlyTemperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Hour of the Day',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Temperature (°C)',
          },
        },
      },
    },
  });
}

// Function to fetch hourly weather data based on city name and update the chart
async function updateHourlyChartByCity(cityName) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    // Extract hourly temperature data
    const hourlyTemperatures = data.list.map((item) => item.main.temp);

    // Update the chart with the new data
    createHourlyChart(hourlyTemperatures);

  } catch (error) {
    console.error('Error fetching hourly weather data:', error);
  }
}

// Function to convert wind direction degrees to cardinal directions
function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', function() {
  const cityName = document.getElementById('cityInput').value;
  getWeatherDataByCity(cityName);
  updateHourlyChartByCity(cityName); // Update the chart when the city changes
});

// Call the getWeatherDataByCity function to fetch and update weather information based on the user's location
getWeatherDataByCity('YourDefaultCity'); // Replace 'YourDefaultCity' with the default city name



// Function to get weather data based on user's location
async function getWeatherDataByLocation() {
  try {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        // Update city name
        document.getElementById('cityName').textContent = data.name;

        // Update temperature
        document.getElementById('temperature').textContent = `${data.main.temp}°C`;

        // Update precipitation (assuming "rain" property in data)
        if (data.rain && data.rain["1h"]) {
          document.getElementById('precipitation').textContent = `${data.rain["1h"]}%`;
        } else {
          document.getElementById('precipitation').textContent = '0%';
        }

        // Update wind
        document.getElementById('wind').textContent = `${data.wind.speed} m/s ${getWindDirection(data.wind.deg)}`;

        // Update humidity
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;

        // Fetch and display hourly weather chart
        updateHourlyChartByLocation(lat, lon);

      });
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
async function updateHourlyChartByLocation(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    // Extract hourly temperature data
    const hourlyTemperatures = data.list.map((item) => item.main.temp);

    // Update the chart with the new data
    createHourlyChart(hourlyTemperatures);

  } catch (error) {
    console.error('Error fetching hourly weather data:', error);
  }
}
// Event listener for the auto-detect button
document.getElementById('autoDetect').addEventListener('click', function() {
  getWeatherDataByLocation();
});
getWeatherDataByLocation();

/* -------------------------------------------------------------------------- */
/*                                     fd                                     */
/* -------------------------------------------------------------------------- */
async function fetchCropData() {
  try {
    const response = await fetch('assets/js/corps.json'); // Replace with the actual path to your JSON file
    const cropData = await response.json();

    // Return the fetched crop data
    return cropData;
  } catch (error) {
    console.error('Error fetching crop data:', error);
    return null;
  }
}

async function compareWeatherWithCrops(weatherData) {
  // Fetch crop data from corps.json
  const cropData = await fetchCropData();

  if (!cropData) {
    return;
  }

  const matchingCrops = [];

  // Extract relevant weather conditions
  const currentTemperature = weatherData.main.temp;
  const currentPrecipitation = (weatherData.rain && weatherData.rain["1h"]) ? weatherData.rain["1h"] : 0;

  // Loop through crops and check if they match the current weather
  for (const crop of cropData.crops) {
    const cropWeatherConditions = crop.weather_conditions;

    // Check if the current weather matches the crop's conditions
    if (
      cropWeatherConditions.includes("temperatures between " + Math.floor(currentTemperature - 5) + "-" + Math.ceil(currentTemperature + 5) + "°C") &&
      (cropWeatherConditions.includes("adequate rainfall") || (cropWeatherConditions.includes("rainfall") && currentPrecipitation > 0))
    ) {
      matchingCrops.push(crop.name);
    }
  }
    // Display matching crops in a separate div
    const matchingCropsDiv = document.getElementById('matchingCrops');
    if (matchingCrops.length > 0) {
      matchingCropsDiv.textContent = 'Crops that can be grown in this weather: ' + matchingCrops.join(', ');
    } else {
      matchingCropsDiv.textContent = 'No crops can be grown in this weather.';
    }
  }
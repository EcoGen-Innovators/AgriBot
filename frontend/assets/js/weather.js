const apiKey = '1b731c5ea8595d02eb473392ea79108b';
    let hourlyTemperatureChart;

    // Function to fetch weather data from OpenWeather API
    function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                updateWeatherData(data);
                // Save weather data to variables
                savedWeatherData = data;
                // Save weather data to localStorage
                localStorage.setItem('weatherData', JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    // Function to fetch hourly weather data from OpenWeather API
    function fetchHourlyWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Extract hourly temperature data from the API response
                const hourlyTemperatureData = data.list.map(item => item.main.temp);

                // Destroy the existing chart (if it exists)
                if (hourlyTemperatureChart) {
                    hourlyTemperatureChart.destroy();
                }

                // Clear the canvas
                const canvas = document.getElementById('hourlyTemperatureChart');
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);

                // Create a new Chart.js chart
                createHourlyTemperatureChart(hourlyTemperatureData);
            })
            .catch(error => {
                console.error('Error fetching hourly weather data:', error);
            });
    }

    // Function to update weather data in the widget
    function updateWeatherData(data) {
        const cityNameElement = document.getElementById('cityName');
        const temperatureElement = document.getElementById('temperature');
        const precipitationElement = document.getElementById('precipitation');
        const windElement = document.getElementById('wind');
        const humidityElement = document.getElementById('humidity');

        cityNameElement.textContent = data.name;
        temperatureElement.textContent = `${data.main.temp}°C`;
        precipitationElement.textContent = `${data.weather[0].description}`;
        windElement.textContent = `${data.wind.speed} m/s`;
        humidityElement.textContent = `${data.main.humidity}%`;
    }

    // Function to create an hourly temperature chart
    function createHourlyTemperatureChart(hourlyTemperatureData) {
        const ctx = document.getElementById('hourlyTemperatureChart').getContext('2d');

        hourlyTemperatureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...Array(hourlyTemperatureData.length).keys()],
                datasets: [
                    {
                        label: 'Hourly Temperature (°C)',
                        data: hourlyTemperatureData,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Hour',
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

    // Event listener for the search button
    document.getElementById('searchBtn').addEventListener('click', () => {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value;

        if (city) {
            fetchWeather(city);
            fetchHourlyWeather(city);
        }
    });

    // Event listener for auto detect location
    document.getElementById('autoDetect').addEventListener('click', () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Fetch the city name based on coordinates using reverse geocoding
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        const city = data.address.city;
                        fetchWeather(city);
                        fetchHourlyWeather(city);
                    })
                    .catch(error => {
                        console.error('Error fetching city name:', error);
                    });
            });
        } else {
            alert('Geolocation is not supported in your browser.');
        }
    });

    // Variables to store weather data
    let savedWeatherData = null;

    // Load weather data from localStorage (if available)
    const storedWeatherData = localStorage.getItem('weatherData');
    if (storedWeatherData) {
        savedWeatherData = JSON.parse(storedWeatherData);
        updateWeatherData(savedWeatherData);
    }

    // ? ***************************

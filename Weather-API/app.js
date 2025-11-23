 document.addEventListener('DOMContentLoaded', function() {
            // DOM elements
            const cityInput = document.getElementById('city');
            const daysInput = document.getElementById('days');
            const getWeatherBtn = document.getElementById('get-weather');
            const loadingElement = document.getElementById('loading');
            const errorMessage = document.getElementById('error-message');
            
            const currentEmpty = document.getElementById('current-empty');
            const locationInfo = document.getElementById('location-info');
            const weatherInfo = document.getElementById('weather-info');
            const cityName = document.getElementById('city-name');
            const regionCountry = document.getElementById('region-country');
            const condition = document.getElementById('condition');
            const conditionIcon = document.getElementById('condition-icon');
            const temperature = document.getElementById('temperature');
            const forecastList = document.getElementById('forecast-list');
            
            // Event listener for the get weather button
            getWeatherBtn.addEventListener('click', function() {
                const city = cityInput.value.trim();
                const days = parseInt(daysInput.value);
                
                if (!city) {
                    showError('Please enter a city name');
                    return;
                }
                
                // Clear any previous errors
                hideError();
                
                // Fetch weather data from API
                fetchWeatherData(city, days);
            });
            
            // Function to fetch weather data from API
            async function fetchWeatherData(city, days) {
                // Show loading state
                showLoading();
                
                try {
                    const response = await fetch(`http://192.168.31.77:8080/weather/forecast?city=${city}&days=${days}`);
                    
                    if (!response.ok) {
                        throw new Error(`API request failed with status ${response.status}`);
                    }
                    
                    const data = await response.json();
                    updateWeatherUI(data);
                    
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    showError(`Failed to fetch weather data: ${error.message}`);
                } finally {
                    hideLoading();
                }
            }
            
            // Function to update the UI with weather data
            function updateWeatherUI(data) {
                const weather = data.weatherResponse;
                const forecast = data.dayTem;
                
                // Show weather info and hide empty state
                currentEmpty.style.display = 'none';
                locationInfo.style.display = 'block';
                weatherInfo.style.display = 'flex';
                
                // Update current weather
                cityName.textContent = weather.city;
                regionCountry.textContent = `${weather.region}, ${weather.country}`;
                condition.textContent = weather.condition;
                temperature.textContent = `${weather.temperature}°C`;
                
                // Update condition icon
                conditionIcon.innerHTML = getWeatherIcon(weather.condition);
                
                // Update forecast
                forecastList.innerHTML = '';
                
                if (forecast.length === 0) {
                    forecastList.innerHTML = `
                        <div class="empty-state">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 14C8 14 9 16 12 16C15 16 16 14 16 14M12 4V2M16 6.5L17.5 5M6 6.5L4.5 5M18 12H20M4 12H6" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                <path d="M7 15C7 15 8 17 11 17C14 17 15 15 15 15" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                <path d="M12 20V22M16 18.5L17.5 20M6 18.5L4.5 20" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <p>No forecast data available</p>
                        </div>
                    `;
                } else {
                    forecast.forEach(day => {
                        const forecastItem = document.createElement('div');
                        forecastItem.className = 'forecast-item';
                        
                        // Format date
                        const date = new Date(day.date);
                        const formattedDate = date.toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                        });
                        
                        // Get appropriate weather icon based on condition
                        const iconSvg = getWeatherIcon(data.weatherResponse.condition);
                        
                        forecastItem.innerHTML = `
                            <div class="forecast-date">${formattedDate}</div>
                            <div class="forecast-icon">${iconSvg}</div>
                            <div class="forecast-temps">
                                <div class="temp-min">
                                    <span class="temp-label">Min</span>
                                    <span class="temp-value">${day.minTem}°C</span>
                                </div>
                                <div class="temp-avg">
                                    <span class="temp-label">Avg</span>
                                    <span class="temp-value">${day.avgTemp}°C</span>
                                </div>
                                <div class="temp-max">
                                    <span class="temp-label">Max</span>
                                    <span class="temp-value">${day.maxTemp}°C</span>
                                </div>
                            </div>
                        `;
                        
                        forecastList.appendChild(forecastItem);
                    });
                }
            }
            
            // Function to get appropriate weather icon based on condition
            function getWeatherIcon(condition) {
                // Icon selection based on condition
                if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle')) {
                    return `
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 14C8 14 9 16 12 16C15 16 16 14 16 14M12 4V2M16 6.5L17.5 5M6 6.5L4.5 5M18 12H20M4 12H6" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
                            <path d="M7 15C7 15 8 17 11 17C14 17 15 15 15 15" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 20V22M16 18.5L17.5 20M6 18.5L4.5 20" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    `;
                } else if (condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear')) {
                    return `
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="5" fill="#FFD700"/>
                            <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    `;
                } else if (condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) {
                    return `
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 10H16C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10H6C3.79086 10 2 11.7909 2 14C2 16.2091 3.79086 18 6 18H18C20.2091 18 22 16.2091 22 14C22 11.7909 20.2091 10 18 10Z" fill="#BDBDBD"/>
                        </svg>
                    `;
                } else if (condition.toLowerCase().includes('mist') || condition.toLowerCase().includes('fog')) {
                    return `
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18C9 18 10 20 13 20C16 20 17 18 17 18M12 9V7M16 11.5L17.5 10M7 11.5L5.5 10M18 17H20M4 17H6" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round"/>
                            <path d="M9.5 15.5C9.5 15.5 10.5 17.5 13.5 17.5C16.5 17.5 17.5 15.5 17.5 15.5" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round"/>
                            <path d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 10 18 10 18 12C18 14 16 14 16 14H8C8 14 6 14 6 12C6 10 8 10 8 10Z" fill="#E0E0E0"/>
                        </svg>
                    `;
                } else if (condition.toLowerCase().includes('storm') || condition.toLowerCase().includes('thunder')) {
                    return `
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 14C8 14 9 16 12 16C15 16 16 14 16 14M12 4V2M16 6.5L17.5 5M6 6.5L4.5 5M18 12H20M4 12H6" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
                            <path d="M13 10L9 16H11L9 22" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    `;
                } else {
                    // Default icon (partly cloudy)
                    return `
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18C9 18 10 20 13 20C16 20 17 18 17 18M12 9V7M16 11.5L17.5 10M7 11.5L5.5 10M18 17H20M4 17H6" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
                            <path d="M9.5 15.5C9.5 15.5 10.5 17.5 13.5 17.5C16.5 17.5 17.5 15.5 17.5 15.5" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
                            <path d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 10 18 10 18 12C18 14 16 14 16 14H8C8 14 6 14 6 12C6 10 8 10 8 10Z" fill="#BDBDBD"/>
                        </svg>
                    `;
                }
            }
            
            // Loading state functions
            function showLoading() {
                loadingElement.style.display = 'block';
                getWeatherBtn.disabled = true;
                getWeatherBtn.textContent = 'Loading...';
            }
            
            function hideLoading() {
                loadingElement.style.display = 'none';
                getWeatherBtn.disabled = false;
                getWeatherBtn.textContent = 'Get Forecast';
            }
            
            // Error handling functions
            function showError(message) {
                errorMessage.textContent = message;
                errorMessage.style.display = 'block';
            }
            
            function hideError() {
                errorMessage.style.display = 'none';
            }
        });
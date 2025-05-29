const apiKey = "91b5acb9dd14439ebc2154808252905";
async function getWeather() {
    
    const city = document.getElementById('cityInput').value;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    
    try {
        const response = await fetch(url);
        // if (!response.ok){
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        const data = await response.json();
        if (data.error){
            weatherDisplay.innerHTML = `<p style="color: red;">Error: ${data.error.message}</p>`
            return;
        }
        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = `<p style="color: red;">Failed to fetch weather data. Please try again later.</p>`
        // console.error('Failed to fetch weather data:', error);
        // alert('Failed to fetch weather data.');
    }
}

function displayWeather(data){

    const { current: { temp_c, humidity, condition, wind_kph }, location: { country, name } } = data;
    const { text, icon } = condition;
    
    const weatherHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p>Temperature: ${temp_c} °C</p>
        <p>Weather: ${text}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${wind_kph} kph</p>
        <img src="https:${icon}" alt="weather icon">
    `;

    document.getElementById('weatherDisplay').innerHTML = weatherHTML;
}
const h5Tag = document.querySelector('h5');
const totalCharacters = h5Tag.textContent.length;
const rootElement = document.documentElement;
rootElement.style.setProperty('--totalCharacters', totalCharacters);


document.getElementById('clear-checkbox').addEventListener('change', () => {
    if(document.getElementById('clear-checkbox').checked)
    {
        document.getElementById('city-input-area').value = ''; // Clear input field
        document.getElementById('clear-checkbox').checked = false; // Uncheck the checkbox
    }
});

const getWeather = () => {
    const city = document.getElementById('city-input-area').value;
    const apiKey = 'a802b4f26fbb9ee6933667bbec313393';
    // const apiKey = '93760980a116cedb099478046661f2b8';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    const progressBar = document.querySelector('progress');
    progressBar.style.display = 'none';
    progressBar.value = 0;

    fetch(apiUrl)
    // .then(response => response.json())
    .then(res => {
        if(!res.ok)
            {
                throw new Error('City Not Found!!');
            }
        return res.json();
    })
    .then(data => {
        progressBar.style.display = 'block';
        progressBar.value = 0;

        // console.log(data);

        const displayWeatherDiv = document.getElementById('showWeather');

        const cityName = data.name;
        const countryName = data.sys.country;
        // const description = data.weather[0].description;
        const description = data.weather[0].main;
        const temperature = data.main.temp;
        const tempFeelsLike = data.main.feels_like;
        const tempMax = data.main.temp_max;
        const tempMin = data.main.temp_min;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;
        const visibility = data.visibility;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        // Get weather icon class based on weather condition
        let weatherIconClass;
        switch (description.toLowerCase()){
            case 'clear':
                weatherIconClass = 'fa-solid fa-sun fa-fade'; // Use sunny icon
                break;
            case 'clouds':
                weatherIconClass = 'fa-solid fa-cloud fa-fade';
                break;
            case 'thunderstorm':
                weatherIconClass = 'fa-solid fa-cloud-bolt fa-fade';
                break;
            case 'wind':
                weatherIconClass = 'fa-solid fa-wind fa-fade';
                break;
            case 'rain':
                weatherIconClass = 'fa-solid fa-cloud-rain fa-fade';
                break;
            case 'snow':
                weatherIconClass = 'fa-solid fa-snowflake fa-fade';
                break;
            case 'haze':
                weatherIconClass = 'fa-solid fa-bars fa-fade';
                break;
            case 'mist':
                weatherIconClass = 'fa-solid fa-water fa-fade';
                break;
            default:
                weatherIconClass = 'fa-solid fa-question fa-fade';
        }


        displayWeatherDiv.innerHTML = `
        <h2>${cityName}, <small>${countryName}</small></h2>
        <i class="${weatherIconClass}" style="font-size: 50px;"></i>
        <p>${description}</p>
        <h1 style="font-size:100px"> ${temperature} &#8451 </h1>
        <p>Feels Like: ${tempFeelsLike} &#8451</p>
        <p>High: ${tempMax} &#8451 <i class="fa-solid fa-temperature-arrow-up fa-fade" style="color: red"></i></p>
        <p>Low: ${tempMin} &#8451 <i class="fa-solid fa-temperature-arrow-down fa-fade" style="color: rgb(101, 191, 226)"></i></p>
        <p>Humidity: ${humidity} &#37; <i class="fa-solid fa-water" style="color: rgb(26, 184, 247)"></i></p>
        <p>Pressure: ${pressure} mBar</p>
        <p>Wind Speed: ${windSpeed} km/h <i class="fa-solid fa-wind"></i></p>
        <p>Latitude: ${latitude} &degN</p>
        <p>Longitude: ${longitude} &degE</p>
        <p>Visibility: ${(visibility/1000)} km <i class="fa-solid fa-eye fa-spin" style="font-size: 20px;"></i></p>
        `;
    })
    .catch(error => {
        progressBar.style.display = 'none';
        progressBar.value = 0;
        console.error('City Not Found. Pl. enter a valid city!!!',error);
        document.getElementById('showWeather').textContent = 'City Not Found. Please enter a valid city!!!';
    })
};

// <p>Sunrise: ${sunrise}</p>
// <p>Sunset: ${sunset}</p>

// <p>Sunrise: ${(Date(sunrise*1000)).toLocaleString()}</p>
//  <p>Sunset: ${(Date(sunset*1000)).toLocaleString()}</p>
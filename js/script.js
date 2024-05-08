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
    progressBar.style.display = 'block';
    progressBar.value = 0;

    fetch(apiUrl)
    // .then(response => response.json())
    .then(response => {
        if(!response.ok)
            {
                throw new Error('City Not Found!!');
            }
        return response.json();
    })
    .then(data => {
        progressBar.style.display = 'none';
        progressBar.value = 0;

        console.log(data);

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

        displayWeatherDiv.innerHTML = `
        <h2>${cityName}, <small>${countryName}</small></h2>
        <p>Description: ${description}</p>
        <h1 style="font-size:100px"> ${temperature} &#8451 </h1>
        <p>Feels Like: ${tempFeelsLike} &#8451</p>
        <p>High: ${tempMax} &#8451</p>
        <p>Low: ${tempMin} &#8451</p>
        <p>Humidity: ${humidity} &#37;</p>
        <p>Pressure: ${pressure} mBar</p>
        <p>Wind Speed: ${windSpeed} km/h</p>
        <p>Latitude: ${latitude} &degN</p>
        <p>Longitude: ${longitude} &degE</p>
        <p>Visibility: ${(visibility/1000)} km</p>
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
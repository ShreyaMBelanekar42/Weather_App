const apiKey = "API_KEY";

function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // retrieving data from API
      const temperature = data.main.temp;
      const description = data.weather.description;
      const feels_like = data.main.feels_like;
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      
      const visibility = data.visibility;

      //converting the visibility from m to km
      const visibility_in_km = visibility / 1000;

      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;

      // Convert sunrise timestamp to local time
      const sunriseDate = new Date(sunrise * 1000);
      const sunriseTime = sunriseDate.toLocaleTimeString();

      // Convert sunset timestamp to local time
      const sunsetDate = new Date(sunset* 1000);
      const sunsetTime = sunsetDate.toLocaleTimeString();

      // Displaying the weather details
      const weatherDetailsDiv = document.getElementById("weatherDetails");
      weatherDetailsDiv.innerHTML = `
          <div class="cards card1">
          <div class="cards card1-item1">
            <img
              src="/assests/sunny.png"
              alt="weather-icon"
              class="weather-icon"
            />
            <h2>${temperature}°C</h2>
            <p${description}</p>
            <hr />
            <div class="flexbox">
              <img src="/assests/location.png" alt="" class="location-icons" />
              <p class="location-text">${city}</p>
            </div>
          </div>
          <div class="cards card2-item2">
            <p>Feels Like</p>
            <div class="flexbox">
              <img
                src="/assests/temperature.png"
                alt=""
                class="temperature-icons"
              />
              <h2>${feels_like}</h2>
            </div>
          </div>
        </div>
        <div class="cards card2">
          <div class="cards card1-item1">
            <div class="flexbox">
                <h4>Sunrise:</h4>
                <p>${sunriseTime}</p>
            </div>
            <div class="flexbox">
                <h4>Sunset:</h4>
                <p>${sunsetTime}</p>
            </div>
          </div>
          
          <div class="cards card2-item2">
            <div class="flexbox">
              <h4>Humidity:</h4>
              <p>${humidity} %</p>
            </div>
            <div class="flexbox">
              <h4>Visibility:</h4>
              <p>${visibility_in_km} km</p>
            </div>
            <div class="flexbox">
              <h4>Pressure:</h4>
              <p>${pressure} hPa</p>
            </div>
          </div>
        </div>
        `;
    })
    .catch((error) => {
      console.error(error);
      //TODO: Handle any errors that occur during the request
    });
}

const searchButton = document.getElementById("searchButton");
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();

    if (city !== "") {
      fetchWeatherData(city);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const countrySelect = document.getElementById("country-select");
    const citySelect = document.getElementById("city-select");
    const countryDetails = document.getElementById("country-details");
    const cityName = document.getElementById("city-name");
    const cityImage = document.getElementById("city-image");
    const cityDescription = document.getElementById("city-description");
    const weatherDetails = document.getElementById("weather-details");
  
    // Data from the JSON
    const data = {
      "countries": [
        {
          "name": "Italy",
          "cities": [
            {
              "name": "Rome",
              "image": "https://via.placeholder.com/300?text=Rome",
              "description": "Known for its ancient monuments and the Vatican.",
              "weather": {
                "temperature": "20°C",
                "humidity": "65%",
                "wind_speed": "10 km/h"
              }
            },
            {
              "name": "Florence",
              "image": "https://via.placeholder.com/300?text=Florence",
              "description": "Famous for its art, museums, and architectural landmarks.",
              "weather": {
                "temperature": "18°C",
                "humidity": "70%",
                "wind_speed": "5 km/h"
              }
            }
          ]
        },
        {
          "name": "France",
          "cities": [
            {
              "name": "Paris",
              "image": "https://via.placeholder.com/300?text=Paris",
              "description": "Known as the 'City of Light', famous for its culture and history.",
              "weather": {
                "temperature": "15°C",
                "humidity": "80%",
                "wind_speed": "12 km/h"
              }
            }
          ]
        }
      ]
    };
  
    // Populate country dropdown
    data.countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });
  
    // Listen for country selection
    countrySelect.addEventListener("change", (event) => {
      const selectedCountry = event.target.value;
      const country = data.countries.find(c => c.name === selectedCountry);
      citySelect.innerHTML = "<option value=''>Select a City</option>";
  
      if (country) {
        populateCityDropdown(country.cities);
        displayCountryInfo(country);
      }
    });
  
    // Populate city dropdown
    function populateCityDropdown(cities) {
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.name;
        option.textContent = city.name;
        citySelect.appendChild(option);
      });
  
      citySelect.disabled = false;
  
      citySelect.addEventListener("change", (event) => {
        const selectedCity = event.target.value;
        const city = cities.find(c => c.name === selectedCity);
        if (city) {
          displayCityInfo(city);
          displayWeatherInfo(city.weather);
        }
      });
    }
  
    // Display country information
    function displayCountryInfo(country) {
      const facts = `
        <strong>Capital:</strong> ${country.capital || 'Not available'}<br>
        <strong>Area:</strong> ${country.area || 'Not available'}<br>
        <strong>Population:</strong> ${country.population || 'Not available'}
      `;
      countryDetails.innerHTML = `<h3>Facts</h3>${facts}`;
    }
  
    // Display city information
    function displayCityInfo(city) {
      cityName.textContent = city.name;
      cityImage.src = city.image;
      cityDescription.textContent = city.description;
    }
  
    // Display weather information
    function displayWeatherInfo(weather) {
      weatherDetails.innerHTML = `
        <strong>Temperature:</strong> ${weather.temperature}°C<br>
        <strong>Humidity:</strong> ${weather.humidity}%<br>
        <strong>Wind Speed:</strong> ${weather.wind_speed} km/h
      `;
    }
  });
  
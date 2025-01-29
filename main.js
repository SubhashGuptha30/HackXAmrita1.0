document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll("ul li"); // All list items
  const exploreMoreBtn = document.querySelector(".about__btn"); // Explore more button

  // Apply initial transitions for list items and button after the page is loaded
  setTimeout(() => {
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 200); // Delay each item for a smooth staggered effect
    });

    // For the explore more button
    setTimeout(() => {
      exploreMoreBtn.classList.add("visible");
    }, listItems.length * 200); // Delay for after all items
  }, 500); // Start transition after a small delay to allow the page to load

  // Menu toggle with smooth transitions for icon change
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", (e) => {
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-menu-line" : "ri-close-line");

    if (isOpen) {
      navLinks.classList.add("close");
      navLinks.addEventListener(
        "animationend",
        (e) => {
          navLinks.classList.remove("open");
          navLinks.classList.remove("close");
        },
        { once: true }
      );
    } else {
      navLinks.classList.add("open");
    }
  });

  navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  });

  // ScrollReveal for smooth animation on page load
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };

  ScrollReveal().reveal(".header__container .section__subheader", {
    ...scrollRevealOption,
  });
  ScrollReveal().reveal(".header__container .section__header", {
    ...scrollRevealOption,
    delay: 500,
  });
  ScrollReveal().reveal(".header__container .scroll__btn", {
    ...scrollRevealOption,
    delay: 1000,
  });
  ScrollReveal().reveal(".header__container .header__socials", {
    ...scrollRevealOption,
    origin: "left",
    delay: 1500,
  });

  // About section reveal
  ScrollReveal().reveal(".about__image-1, .about__image-3", {
    ...scrollRevealOption,
    origin: "right",
  });
  ScrollReveal().reveal(".about__image-2", {
    ...scrollRevealOption,
    origin: "left",
  });
  ScrollReveal().reveal(".about__content .section__subheader", {
    ...scrollRevealOption,
    delay: 500,
  });
  ScrollReveal().reveal(".about__content .section__header", {
    ...scrollRevealOption,
    delay: 1000,
  });
  ScrollReveal().reveal(".about__content p", {
    ...scrollRevealOption,
    delay: 1500,
  });
  ScrollReveal().reveal(".about__content .about__btn", {
    ...scrollRevealOption,
    delay: 2000,
  });

  // Fetch and display data from APIs
  const countrySelect = document.getElementById("country-select");
  const citySelect = document.getElementById("city-select");
  const cityName = document.getElementById("city-name");
  const cityImage = document.getElementById("city-image");
  const cityDescription = document.getElementById("city-description");
  const weatherInfo = document.getElementById("weather-info");

  // Function to fetch data from GeoDB Cities API
  async function fetchCities(country) {
    const apiKey = "6b925784f5msh90586a0dc2c53e5p105247jsna9cd39114858"; // Replace with your GeoDB API key
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${country}/cities?limit=10`;
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    });
    const data = await response.json();
    return data.data.map((city) => city.name);
  }

  // Function to fetch data from Wikipedia API
  async function fetchCityInfo(city) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      description: data.extract || "No description available",
      image: data.thumbnail?.source || "default-image.jpg", // Replace with a placeholder image if no image is available
    };
  }

  // Function to fetch weather data from Weather API
  async function fetchWeather(city) {
    const apiKey = "b7b0d31adedc56c07e5767ecd3406dbb"; // Replace with your Weather API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      temperature: `${data.current.temp_c}°C`,
      condition: data.current.condition.text,
      humidity: `${data.current.humidity}%`,
      windSpeed: `${data.current.wind_kph} km/h`,
    };
  }

  // Populate cities based on selected country
  countrySelect.addEventListener("change", async () => {
    const selectedCountry = countrySelect.value;
    if (selectedCountry) {
      const cities = await fetchCities(selectedCountry);
      citySelect.innerHTML = `<option value=''>Select a City</option>`;
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  });

  // Fetch city info and weather on city selection
  citySelect.addEventListener("change", async () => {
    const selectedCity = citySelect.value;
    if (selectedCity) {
      const cityInfo = await fetchCityInfo(selectedCity);
      const weatherData = await fetchWeather(selectedCity);

      cityName.textContent = selectedCity;
      cityImage.src = cityInfo.image;
      cityImage.alt = `${selectedCity} Image`;
      cityDescription.textContent = cityInfo.description;

      weatherInfo.innerHTML = `
        <strong>Temperature:</strong> ${weatherData.temperature}<br>
        <strong>Condition:</strong> ${weatherData.condition}<br>
        <strong>Humidity:</strong> ${weatherData.humidity}<br>
        <strong>Wind Speed:</strong> ${weatherData.windSpeed}
      `;
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const countrySelect = document.getElementById("country-select");
  const citySelect = document.getElementById("city-select");
  const cityName = document.getElementById("city-name");
  const cityImage = document.getElementById("city-image");
  const cityDescription = document.getElementById("city-description");
  const weatherInfo = document.getElementById("weather-info");

  // Fetch JSON data
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      populateCountryDropdown(data.countries);
      addCountrySelectListener(data.countries);
    })
    .catch((error) => console.error("Error loading JSON data:", error));

  function populateCountryDropdown(countries) {
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });
  }

  function addCountrySelectListener(countries) {
    countrySelect.addEventListener("change", (event) => {
      const selectedCountry = event.target.value;
      citySelect.innerHTML = "<option value=''>Select a City</option>";
      citySelect.disabled = !selectedCountry;

      const country = countries.find((c) => c.name === selectedCountry);
      if (country) {
        populateCityDropdown(country.cities);
        displayCountryInfo(country); // Display country info like facts, history
      }
    });
  }

  function populateCityDropdown(cities) {
    cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city.name;
      option.textContent = city.name;
      citySelect.appendChild(option);
    });

    citySelect.addEventListener("change", (event) => {
      const selectedCity = event.target.value;
      const city = cities.find((c) => c.name === selectedCity);
      if (city) {
        displayCityInfo(city);
        displayWeatherInfo(city.weather); // Display weather info dynamically
      }
    });
  }

  function displayCountryInfo(country) {
    // Display facts, history, and culture info for the country
    const facts = `
      <strong>Capital:</strong> ${country.facts.capital}<br>
      <strong>Area:</strong> ${country.facts.area}<br>
      <strong>Population:</strong> ${country.facts.population}
    `;
    const history = `
      <strong>Founded:</strong> ${country.history.founded}<br>
      <strong>Historical Events:</strong> ${country.history.historical_events.join(", ")}
    `;
    const culture = `
      <strong>Languages:</strong> ${country.culture.languages.join(", ")}<br>
      <strong>Cuisine:</strong> ${country.culture.cuisine.join(", ")}
    `;
    const weather = `
      <strong>Average Temperature:</strong> ${country.weather.average_temperature}<br>
      <strong>Climate:</strong> ${country.weather.climate}<br>
      <strong>Rainfall:</strong> ${country.weather.rainfall}
    `;

    // Display all country information
    document.getElementById("country-info").innerHTML = `
      <h3>Facts</h3>${facts}
      <h3>History</h3>${history}
      <h3>Culture</h3>${culture}
      <h3>Weather</h3>${weather}
    `;
  }

  function displayCityInfo(city) {
    cityName.textContent = city.name;
    cityImage.src = city.image;
    cityImage.alt = `${city.name} Image`;
    cityDescription.textContent = city.info;
  }

  function displayWeatherInfo(weather) {
    weatherInfo.innerHTML = `
      <strong>Temperature:</strong> ${weather.temperature}°C<br>
      <strong>Humidity:</strong> ${weather.humidity}%<br>
      <strong>Wind Speed:</strong> ${weather.wind_speed} km/h
    `;
  }
});


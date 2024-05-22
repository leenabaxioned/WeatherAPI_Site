let apiKey = "3de36f56a57cd6279c0f4a19393f5cda";
let apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search img");
let weather_icon = document.querySelector(".weather-icon");

let cel;
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
async function checkWeather(city) {
    try {
      const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
  
      if (!response.ok) {
        throw new Error("Unable to fetch weather data.");
      }
  
      const data = await response.json();
  
      document.querySelector(".city").innerHTML = data.name;
      const tempCelcius = Math.round(data.main.temp);
      document.querySelector(".temp").innerHTML = tempCelcius + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".pressure").innerHTML = data.main.pressure;
  
      if (data.weather[0].main === "Clouds") {
        weather_icon.src = "../assets/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weather_icon.src = "../assets/clear.png";
      } else if (data.weather[0].main === "Rain") {
        weather_icon.src = "../assets/rain.png";
      } else if (data.weather[0].main === "Drizzle") {
        weather_icon.src = "../assets/drizzle.png";
      } else if (data.weather[0].main === "Mist") {
        weather_icon.src = "../assets/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".err").style.display = "none";

      cel = tempCelcius;
    } catch (error) {
      document.querySelector(".err").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      console.error(error);
    }
  }

  searchButton.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
      checkWeather(city);
      document.querySelector(".weather").style.backgroundColor = "#004d7a";
    }
  });
  
  document.getElementById("farenheit").addEventListener("click", () => {
    if (cel !== undefined) {
      let fer = Math.floor(cel * 1.8 + 32);
      document.querySelector(".temp").innerHTML = fer + "°F";
    }
  });

  document.getElementById("celcius").addEventListener("click", () => {
    if (cel !== undefined) {
      document.querySelector(".temp").innerHTML = cel + "°C";
    }
  });
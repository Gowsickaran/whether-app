const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const result = document.getElementById('result');

let latestData = null;

searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') getWeather();
});

function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    cityInput.style.border = '2px solid red';
    cityInput.placeholder = 'Enter the city name!';
    result.innerHTML = '';
    return;
  }

  cityInput.style.border = '1px solid #ccc';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be93482ee8415b4f578488575d1a73d3&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        result.innerHTML = `<p style="color: red;">City not found. Please enter a valid city name.</p>`;
        return;
      }

      latestData = data;

      const temp = data.main.temp;
      const weather = data.weather[0].main.toLowerCase();
      const description = data.weather[0].description;

      result.innerHTML = `
        <div class="city-info">
          <p class="city-clickable"><strong>${data.name}, ${data.sys.country}</strong></p>
          <p>${capitalize(weather)} - ${description}</p>
          <p>🌡 ${temp} °C</p>
        </div>
      `;
    })
    .catch(() => {
      result.innerHTML = `<p>Error fetching data</p>`;
    });
}

result.addEventListener("click", e => {
  const cityElement = e.target.closest(".city-clickable");
  const existingInfo = document.querySelector('.season-info');

  if (cityElement && latestData) {
    if (existingInfo) {
      // If already visible, remove it and reset city style
      existingInfo.remove();
      cityElement.style.border = "none";
      cityElement.style.padding = "0";
    } else {
      // Create and show season + quote + date
      const temp = latestData.main.temp;
      const weather = latestData.weather[0].main.toLowerCase();
      const season = getSeasonFromTemp(temp);
      const quote = getQuote(weather, season);

      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const formattedTime = now.toLocaleTimeString('en-US');

     const seasonHTML = `
  <div class="season-info" style="margin-top: 10px;">
    <p>📅 Date: <strong>${formattedDate}</strong></p>
    <p>🌱 Season: <strong>${season}</strong></p>
    <p style="font-style: italic;">💬 ${quote}</p>
  </div>
`;


      cityElement.insertAdjacentHTML("afterend", seasonHTML);

      // Add style on show
      cityElement.style.border = "2px solid #66a6ff";
      cityElement.style.borderRadius = "8px";
      cityElement.style.padding = "4px";
      cityElement.style.transition = "all 0.3s ease";
    }
  }
});

function getSeasonFromTemp(temp) {
  if (temp >= 35) return "Very Hot / Heat Wave";
  if (temp >= 28) return "Summer";
  if (temp >= 20) return "Spring";
  if (temp >= 12) return "Autumn";
  if (temp >= 5) return "Winter";
  return "Very Cold / Snowy";
}

function getQuote(weather, season) {
  if (weather.includes("rain")) return "☔ Don't forget your umbrella!";
  if (weather.includes("cloud")) return "⛅ A cloudy day is no match for a sunny attitude.";
  if (weather.includes("clear")) return "🌞 It’s a bright and beautiful day!";
  if (season.includes("Winter")) return "❄️ Stay warm and cozy!";
  if (season.includes("Heat")) return "🔥 It's scorching! Stay hydrated.";
  return "🌎 Have a great day!";
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
//udpate date 
// Function to format date
function showCurrentDate() {
  const dateContainer = document.getElementById('currentDate');
  const now = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formattedDate = now.toLocaleDateString('en-US', options);
  dateContainer.textContent = formattedDate;
}

// Call it when the page loads
showCurrentDate();

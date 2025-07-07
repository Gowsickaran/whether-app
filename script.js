const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const result = document.getElementById('result');

searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') getWeather();
});

function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be93482ee8415b4f578488575d1a73d3&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        result.innerHTML = `<p>City not found. Please enter a valid city name.</p>`;
        return;
      }
      result.innerHTML = `
        <p><strong>${data.name}, ${data.sys.country}</strong></p>
        <p>${data.weather[0].main} - ${data.weather[0].description}</p>
        <p>🌡 ${data.main.temp} °C</p>
      `;
    })
    .catch(() => {
      result.innerHTML = `<p>Error fetching data</p>`;
    });
}

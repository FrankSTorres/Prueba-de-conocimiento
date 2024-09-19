//import L from 'leaflet';

console.log("voy aca");

const cityForm = document.getElementById('city-form');
const consultButton = document.getElementById('consult-button');
const clearButton = document.getElementById('clear-button');
const weatherTableBody = document.getElementById('weather-table-body');
const mapDiv = document.getElementById('map');

//API consultar mapa, a traves del campo buscar y boton consultar

const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo(map);

console.log(map);

// API de clima (por ejemplo, OpenWeatherMap)
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '809769e2409cea9a38a00b915f651c3c';

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value.trim();
  if (city === '') {
    alert('Por favor, ingrese una ciudad');
    return;
  } 
  // Función asíncrona
  fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('No se encontró la ciudad');  //Validación 
        return;
      }
      const weatherData = [
        [data.name],
        [`${data.main.temp} °C`],
        [`${data.main.humidity} %`],
        [`${data.wind.speed} m/s`]
      ];
      weatherTableBody.innerHTML = '';
      weatherData.forEach((row) => {
        const tableRow = document.createElement('th');
        row.forEach((cell) => {
          const tableCell = document.createElement('tr');
          tableCell.textContent = cell;
          tableRow.appendChild(tableCell);
        });
        weatherTableBody.appendChild(tableRow);
      });
      // Actualizar la vista del mapa con la ubicación de la ciudad
      map.setView([data.coord.lat, data.coord.lon], 13);
    })
    .catch(error => console.error(error));
});
//Función evento limpiar
clearButton.addEventListener('click', () => {
  document.getElementById('city').value = '';
  console.log("voy aca");
  weatherTableBody.innerHTML = '';
  mapDiv.innerHTML = '';
});
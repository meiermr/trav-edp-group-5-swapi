let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  rotation_period = document.querySelector('span#rotation_period');
  orbital_period = document.querySelector('span#orbital_period');
  diameter = document.querySelector('span#diameter');
  climate = document.querySelector('span#climate');
  gravity = document.querySelector('span#gravity');
  terrain = document.querySelector('span#terrain');
  surface_water = document.querySelector('span#surface_water');
  population = document.querySelector('span#population');
  residentsUl = document.querySelector('#residents>ul');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getplanet(id)
});

async function getplanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.residents = await fetchResidents(planet)
    planet.films = await fetchFilms(planet)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderplanet(planet);

}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchResidents(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const residents = await fetch(url)
    .then(res => res.json())
  return residents;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderplanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  rotation_period.textContent = planet?.rotation_period;
  orbital_period.textContent = planet?.orbital_period;
  diameter.textContent = planet?.diameter;
  climate.textContent = planet?.climate;
  gravity.textContent = planet?.gravity;
  terrain.textContent = planet?.terrain;
  surface_water.textContent = planet?.surface_water;
  population.textContent = planet?.population;
  
  const filmLis = planet?.films?.map(film => `<li><a href="/character.html?id=${film.id}"> ${film.title} </a></li>`)
  filmsUl.innerHTML = filmLis.join("");

  const residentsLis = planet?.residents?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name} </a> </li>`)
  residentsUl.innerHTML = residentsLis.join("");
  
}

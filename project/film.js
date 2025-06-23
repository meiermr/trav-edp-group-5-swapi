const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  titleH1 = document.getElementById('title')
  episodeIdSpan = document.getElementById('episode_id')
  directorSpan = document.getElementById('film_director')
  producerSpan = document.getElementById('producer')
  releaseDateSpan = document.getElementById('release_date')
  openingCrawlSpan = document.getElementById('opening_crawl')
  planetsUl = document.querySelector('#planets>ul')
  charactersUl = document.querySelector('#characters>ul')
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    film.planets = await fetchPlanets(film);
    film.characters = await fetchCharacters(film);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planets = await fetch(url).then((res) => res.json());
  return planets;
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

const renderFilm = (film) => {
  document.title = `SWAPI - ${film?.title}`;
  titleH1.textContent = film?.title;
  episodeIdSpan.textContent = film?.episode_id;
  directorSpan.textContent = film?.director;
  producerSpan.textContent = film?.producer;
  releaseDateSpan.textContent = film?.release_date;
  openingCrawlSpan.textContent = film?.opening_crawl;

  const planetsList = film?.planets?.map(
    (planet) => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`
  );
  planetsUl.innerHTML = planetsList.join("");

  const characterList = film?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  charactersUl.innerHTML = characterList.join("");
};

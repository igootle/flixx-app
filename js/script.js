const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <div class="card">
      <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
          src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"
        />`
          : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
      />`
      }
        
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    </div>
      `;
    document.querySelector("#popular-movies").appendChild(div);
  });

  console.log(results);
}

// Fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  const API_KEY = "81e82be1b394131d90ae1b01d66a1ace";
  const API_URL = "https://api.themoviedb.org/3/";

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=th-TH`
  );

  const data = await response.json();

  return data;
};

// Highlight active link
const highlightActiveLink = () => {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
};

// Init App
const init = () => {
  switch (global.currentPage) {
    case "/":
    case "index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      console.log("Shows");
      break;
    case "movie-details.html":
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActiveLink();
};

document.addEventListener("DOMContentLoaded", init);

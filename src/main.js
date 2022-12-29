const URL_API = `https://api.themoviedb.org/3/`;
const api = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json;charsef=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: "es-VE",
  },
});

const trendingURL = [
  /* API URL */
  URL_API,
  /* END POINT*/
  `trending`,
].join("");

/* Utils */
function clearHTML($parentNode) {
  while ($parentNode.firstChild) {
    $parentNode.removeChild($parentNode.firstChild);
  }
}

function renderMoviesPosters({ arr, urlBaseImagen, parentNode }) {
  const fragment = new DocumentFragment();
  clearHTML(parentNode);
  arr.forEach((item) => {
    const { title, poster_path, id } = item;

    /* Create elements */
    const $movieContainer = document.createElement("div");
    const $movieImg = document.createElement("img");

    /* add class elements */
    $movieContainer.classList.add("movie-container");
    $movieImg.classList.add("movie-img");

    /* create movie url imagen */
    const urlImg = `${urlBaseImagen}${poster_path}`;

    /* add atribute to elements */
    $movieImg.setAttribute("alt", title);
    $movieImg.setAttribute("src", urlImg);

    /* add elements to containers */
    $movieContainer.appendChild($movieImg);

    /* add event listerner to Element */
    $movieContainer.onclick = () => {
      location.hash = `#movie=${id}`;
    };
    fragment.appendChild($movieContainer);
  });
  parentNode.appendChild(fragment);
}

function renderGenresPreview({ genres, parentNode }) {
  const fragment = new DocumentFragment();
  clearHTML(parentNode);
  genres.forEach((genre) => {
    const { id, name } = genre;

    /* Create elements */
    const $categoryContainer = document.createElement("div");
    const $titleCategory = document.createElement("h3");
    const $contentTitleCategory = document.createTextNode(name);
    /* add class elements */
    $categoryContainer.classList.add("category-container");
    $titleCategory.classList.add("category-title");

    /* add id values */
    $titleCategory.setAttribute("id", `id${id}`);
    /* add events to elements*/

    $categoryContainer.onclick = () => {
      const categoryQueryParameter = "#category=";
      location.hash = `${categoryQueryParameter}${id}-${name}`;
    };
    /* add elements to container */
    $titleCategory.appendChild($contentTitleCategory);
    $categoryContainer.appendChild($titleCategory);
    fragment.appendChild($categoryContainer);
  });
  parentNode.appendChild(fragment);
}
/* API Fetch */

async function getTrendingMoviesPreview() {
  const time_window = "day";
  const media_type = "movie";
  /* const tradingURLDayMovies = `${trendingURL}/${media_type}/${time_window}?api_key=${API_KEY}`;
  const res = await fetch(tradingURLDayMovies);
  const data = await res.json();
   */
  const { data, status } = await api(`trending/${media_type}/${time_window}`);
  const { results: movies } = data;
  const urlBaseImagen = "https://image.tmdb.org/t/p/w300";
  const moviesElementsTrending = renderMoviesPosters({
    arr: movies,
    urlBaseImagen,
    parentNode: trendingMoviesPreviewList,
  });
}

async function getGenresPreview() {
  /* const urlGenres = `${URL_API}genre/movie/list?language=es&api_key=${API_KEY}`;
  const res = await fetch(urlGenres);
  const data = await res.json(); */
  const { data } = await api("genre/movie/list");
  const genres = data.genres;
  renderGenresPreview({
    genres,
    parentNode: categoriesPreviewList,
  });
}

async function getMoviesByCategory(id) {
  const { data, status } = await api(`/discover/movie`, {
    params: {
      with_genres: id,
    },
  });
  const { results: movies } = data;
  const urlBaseImagen = "https://image.tmdb.org/t/p/w500";
  const moviesElementsByCategories = renderMoviesPosters({
    arr: movies,
    urlBaseImagen,
    parentNode: genericSection,
  });
}

async function getMoviesBySearch(query) {
  const secureQuery = decodeURI(query);
  const { data } = await api("/search/movie", {
    params: {
      query: secureQuery,
    },
  });
  const urlBaseImagen = "https://image.tmdb.org/t/p/w500";
  const movies = data.results;
  renderMoviesPosters({
    arr: movies,
    urlBaseImagen,
    parentNode: genericSection,
  });
}

async function getTrendingMovies() {
  const time_window = "day";
  const media_type = "movie";

  const { data, status } = await api(`trending/${media_type}/${time_window}`);
  const { results: movies } = data;
  const urlBaseImagen = "https://image.tmdb.org/t/p/w500";
  const moviesElementsTrending = renderMoviesPosters({
    arr: movies,
    urlBaseImagen,
    parentNode: genericSection,
  });
}

async function getMovieById(id) {
  const { data: movie } = await api(`/movie/${id}`);
  const {
    title,
    overview,
    vote_average,
    genres,
    poster_path: posterURL,
  } = movie;
  movieDetailTitle.innerText = title;
  const urlBaseImage = "https://image.tmdb.org/t/p/w300";
  console.log(urlBaseImage + posterURL);
  const movieImageUrl = `${urlBaseImage}${posterURL}`;
  headerSection.style.background = `
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.35) 19.27%, 
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImageUrl})
  `;
  movieDetailDescription.innerText = overview;
  movieDetailScore.innerText = vote_average;
  renderGenresPreview({ genres, parentNode: movieDetailCategoriesList });
}
async function getRelatedMoviesById(id) {
  const { data } = await api(`movie/${id}/similar`);
  const { results: relatedMovies } = data;
  const urlBaseImage = "https://image.tmdb.org/t/p/w300";
  renderMoviesPosters({
    arr: relatedMovies,
    urlBaseImagen: urlBaseImage,
    parentNode: relatedMoviesContainer,
  });
}

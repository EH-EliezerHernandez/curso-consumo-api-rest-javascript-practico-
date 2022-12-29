searchFormBtn.addEventListener("click", () => {
  const searchValue = searchFormInput.value;
  location.hash = `#search=${searchValue}`;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  const stateHash = history.state?.fisrtHash ?? "";
  if (stateHash.includes("#")) {
    location.hash = "";
    return;
  }
  history.back();
});

function renderHomePage() {
  const inactiveClass = "inactive";
  console.log("home");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove(".header-arrow--white");
  arrowBtn.classList.add(inactiveClass);
  headerTitle.classList.remove(inactiveClass);
  headerCategoryTitle.classList.add(inactiveClass);
  searchForm.classList.remove(inactiveClass);
  trendingPreviewSection.classList.remove(inactiveClass);
  categoriesPreviewSection.classList.remove(inactiveClass);
  genericSection.classList.add(inactiveClass);
  movieDetailSection.classList.add(inactiveClass);
  getTrendingMoviesPreview();
  getGenresPreview();
}

function renderTrendsPage() {
  const inactiveClass = "inactive";
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove(".header-arrow--white");
  arrowBtn.classList.remove(inactiveClass);
  headerTitle.classList.add(inactiveClass);
  headerCategoryTitle.classList.remove(inactiveClass);
  searchForm.classList.add(inactiveClass);
  trendingPreviewSection.classList.add(inactiveClass);
  categoriesPreviewSection.classList.add(inactiveClass);
  genericSection.classList.remove(inactiveClass);
  movieDetailSection.classList.add(inactiveClass);
  headerCategoryTitle.innerText = "Tendencias";
  getTrendingMovies();
  console.log("tendencias");
}

function renderSearchPage() {
  const inactiveClass = "inactive";
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove(".header-arrow--white");
  arrowBtn.classList.remove(inactiveClass);
  headerTitle.classList.add(inactiveClass);
  headerCategoryTitle.classList.add(inactiveClass);
  searchForm.classList.remove(inactiveClass);
  trendingPreviewSection.classList.add(inactiveClass);
  categoriesPreviewSection.classList.add(inactiveClass);
  genericSection.classList.remove(inactiveClass);
  movieDetailSection.classList.add(inactiveClass);

  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);
  console.log("Busqueda");
}

function renderMovieDetailsPage() {
  const inactiveClass = "inactive";
  headerSection.classList.add("header-container--long");
  arrowBtn.classList.remove(inactiveClass);
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add(inactiveClass);
  headerCategoryTitle.classList.add(inactiveClass);
  searchForm.classList.add(inactiveClass);
  trendingPreviewSection.classList.add(inactiveClass);
  categoriesPreviewSection.classList.add(inactiveClass);
  genericSection.classList.add(inactiveClass);
  movieDetailSection.classList.remove(inactiveClass);
  const [_, movieId] = location.hash.split("=");

  getMovieById(movieId);
  getRelatedMoviesById(movieId);
  console.log("Movie");
}

function renderCategoriesPage() {
  //Scroll en el inicio de la pagina
  const inactiveClass = "inactive";
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove(".header-arrow--white");
  arrowBtn.classList.remove(inactiveClass);
  headerTitle.classList.add(inactiveClass);
  headerCategoryTitle.classList.remove(inactiveClass);
  searchForm.classList.add(inactiveClass);
  trendingPreviewSection.classList.add(inactiveClass);
  categoriesPreviewSection.classList.add(inactiveClass);
  genericSection.classList.remove(inactiveClass);
  movieDetailSection.classList.add(inactiveClass);
  console.log("Category");

  const [_, categoryQuery] = location.hash.split("=");
  const [categoryID, categoryName] = categoryQuery.split("-");
  const categoryNameWithSpecialCharacters = decodeURIComponent(categoryName);

  /* const categoryNameWithSpecialCharacters = decoding(categoryName); */
  headerCategoryTitle.innerText = categoryNameWithSpecialCharacters;
  getMoviesByCategory(categoryID);
}

function navigator() {
  const { hash } = location;
  const idTrends = "#trends";
  const idSearch = "#search=";
  const idMovie = "#movie=";
  const idCategory = "#category=";
  window.scroll(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  if (hash.startsWith(idTrends)) {
    renderTrendsPage();
    return;
  }
  if (hash.startsWith(idSearch)) {
    renderSearchPage();
    return;
  }
  if (hash.startsWith(idMovie)) {
    renderMovieDetailsPage();
    return;
  }
  if (hash.startsWith(idCategory)) {
    renderCategoriesPage();
    return;
  }
  renderHomePage();
}
window.addEventListener("hashchange", navigator);
window.addEventListener("DOMContentLoaded", () => {
  navigator();
  historyState = {
    fisrtHash: location.hash,
  };
  history.pushState(historyState, null);
});

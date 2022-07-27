let result;

const displayResults = (data) => {
  const resultsArea = document.querySelector('.results-area');
  resultsArea.innerHTML = "";

  if(data.Response === "False") {
    return resultsArea.innerHTML = `
      <div>
        <h2>Não foi possivel encontrar nenhum resultado</h2>
      </div>
    `
  }

  return data.Search.map(item => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('results-item');
    resultItem.innerHTML = `
      <img src="${item.Poster}" alt="${item.Title}" id="${item.imdbID}" class="moviePoster"/>
      <h3>${item.Title}</h3>
      <p>${item.Year}</p>`;
      resultsArea.appendChild(resultItem);
  })
}

function searchDetails(imdbID) {
  fetch(`https://www.omdbapi.com/?apikey=d066d606&i=${imdbID}`).then((response) => response.json()).then((data) => {
    console.log(data);

    const MAIN_CONTENT = document.querySelector('.main-content');
    MAIN_CONTENT.innerHTML = "";

    const detailsMovie = document.createElement('div');
    detailsMovie.classList.add('detailsMovie');
    detailsMovie.innerHTML = `
    <div class="detail-left">
      <img src="${data.Poster}" alt="${data.Title}" class="moviePoster"/>
    </div>
    <div class="detail-right">
      <h1>${data.Title}</h1>
      <h3>${data.Plot}</h3>
      <div class="producers">
        <h3 class="director">Diretor: ${data.Director}</h3>
        <h3 class="writer">Escritor: ${data.Writer}</h3>
      </div>
      <h3>Gêneros: ${data.Genre}</h3>
      <h3>${data.Released}</h3>
      <div class="button-details">
        <div class="button">
          Assistir
        </div>
      </div>
    </div>
    `
    MAIN_CONTENT.appendChild(detailsMovie);
  })
}

const search = async (value, type) => {
  fetch(`http://www.omdbapi.com/?apikey=d066d606&type=${type}&s=${value}`).then((response) => response.json()).then((data) => {
    console.log(data);
    result = data;
    displayResults(data);

    const moviePoster = document.querySelectorAll('.moviePoster');

    moviePoster.forEach(e => {
      e.addEventListener('click', () => {
        console.log("id" + e.id);
        searchDetails(e.id);
      })
    })
  })
}

window.onload = function() {
  const SEARCH_INPUT = document.querySelector('.search-input');
  const SEARCH_SELECT = document.querySelector('#search-select');

  SEARCH_SELECT.addEventListener('change', function(e) {
    let searchValue = SEARCH_INPUT.value;
    let searchType = SEARCH_SELECT.value;

    if (searchValue.length > 3){
      console.log('Searching...');
      search(searchValue, searchType);
    }
  })

  SEARCH_INPUT.addEventListener('input', function(e) {
    console.log(SEARCH_INPUT.value, SEARCH_SELECT.value, "value");
    let searchValue = SEARCH_INPUT.value;
    let searchType = SEARCH_SELECT.value;

    if (searchValue.length > 3){
      console.log('Searching...');
      search(searchValue, searchType);
    }
  })
}
//  details: https://www.omdbapi.com/?i=tt3896198&apikey=3e11fbb4
// titles: https://www.omdbapi.com/?s=thor&page=1&apikey=3e11fbb4

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('resultat-grid');

//Load movies from API
async function loadMovies(searchTerm, page){

    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=3e11fbb4`;

    const res = await fetch(URL);
    const data = await res.json();
    console.log(data.Search)
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let page = 1;
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm, page);
    } else{
        searchList.classList.add('hide-search-list');
    }
}

// function addFilms(page){
//     let page = page+1;
//     let searchTerm = (movieSearchBox.value).trim();
//     loadMovies(searchTerm, page);
// }

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else
            moviePoster = "https://demofree.sirv.com/nope-not-here.jpg" //image not found
        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>`;
        searchList.appendChild(movieListItem); 
    }
    loadMoviesDetails();
}
//faire en sorte que les movie details soit dans movie.html et pas search
function loadMoviesDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async() => {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=3e11fbb4`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}


function displayMovieDetails(details){
    console.log(details)
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src="${(details.Poster != "N/A") ? details.Poster : "https://fr.web.img2.acsta.net/pictures/17/03/01/11/10/438835.jpg"}" alt="movie poster">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">${details.Year}</li>
            <li class="rated">${details.Rated}</li>
            <li class="released">${details.Released}</li>
        </ul>
        <p class="genre"><b>Genre:</b>${details.Genre}</p>
        <p class="writer"><b>Writer:</b>${details.Writer}</p>
        <p class="actors"><b>Actors:</b>${details.Actors}</p>
        <p class="plot"><b>Plot:</b>${details.Plot}</p>
        <p class="language"><b>Language:</b>${details.Language}</p>
        <p class="awards"><b><i class="fas fa-award"></i></b>${details.Awards}</p>
    </div>
    `;
}  
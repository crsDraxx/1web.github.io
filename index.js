const API_KEY = '3e11fbb4';
const BASE_URL = 'https://www.omdbapi.com/';
const moviesContainer = document.getElementById('movies-container');
const loadMoreBtn = document.getElementById('load-more-btn');
 
let currentPage = 1;
 
// Fetch movies from OMDB API
async function fetchMovies(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}?s=movie&y=2024&page=${page}&apikey=${API_KEY}`);
        const data = await response.json();
 
        // Vérifie si la réponse contient des films
        if (data.Response === "True" && data.Search) {
            displayMovies(data.Search);
        } else {
            console.error('Aucun film trouvé ou erreur dans la réponse de l\'API', data.Error || '');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des films :', error);
    }
}
 
// Display movies in the container
function displayMovies(movies) {
    movies.slice(0, 6).forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
 
        movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <a href="movie.html?title=${encodeURIComponent(movie.Title)}">En savoir plus</a>
        `;
        moviesContainer.appendChild(movieCard);
    });
}
 
// Load more movies
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    fetchMovies(currentPage);
});
 
// Initial fetch
fetchMovies(currentPage);
 
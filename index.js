const API_KEY = '3e11fbb4';
const BASE_URL = 'https://www.omdbapi.com/';
const carousel = document.getElementById('carousel');
const moviesContainer = document.getElementById('movies-container');
const loadMoreBtn = document.getElementById('load-more-btn');

let currentSlide = 0; 
let totalSlides = 0; 
let currentPage = 1;

async function fetchPopularMovies() {
    try {
        const response = await fetch(`${BASE_URL}?s=action&y=2024&page=1&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True" && data.Search) {
            const movies = data.Search.slice(0, 3); 
            totalSlides = movies.length; 
            createCarousel(movies);
        } else {
            console.error('Aucun film trouvé ou erreur dans la réponse de l\'API', data.Error || '');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des films :', error);
    }
}

function createCarousel(movies) {
    movies.forEach(movie => {
        const movieSlide = document.createElement('div');
        movieSlide.className = 'movie-slide';
        movieSlide.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        carousel.appendChild(movieSlide);
    });

    currentSlide = Math.floor(totalSlides / 2); 
    updateCarouselPosition();

    addCarouselControls();
}

function addCarouselControls() {
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;';
    prevButton.addEventListener('click', () => slideCarousel(-1));

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;'; 
    nextButton.addEventListener('click', () => slideCarousel(1));

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    document.querySelector('.carousel_box').appendChild(controls);
}

function updateCarouselPosition() {
    const slideWidth = 300;
    const offset = -currentSlide * (slideWidth + 20); 
    carousel.style.transform = `translateX(${offset}px)`;
}

function slideCarousel(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    updateCarouselPosition();
}

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
})

fetchPopularMovies();


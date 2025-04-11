// b1831601
const apiKey = 'b1831601';
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const movieDetails = document.getElementById('movie-details');

searchBtn.addEventListener('click', () => {
    const movieTitle = searchInput.value;

    if (movieTitle) {
        fetchMovieData(movieTitle);
    } else {
        alert("please Enter a movie title!");
    }
});

// Fetch Movie data

function fetchMovieData(title) {
    fetch(`https://www.omdbapi.com/?apikey=b1831601&t=${title}`)
        .then(response => {
            // Check if response is ok (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === "False") {
                // API returned an error, show error message
                movieDetails.innerHTML = `<p>Error: ${data.Error}</p>`;
            } else {
                // Successful response, display data
                displayMovieData(data);
            }
        })
        .catch(error => {
            // Log error to console and display it on the page
            console.error('Error fetching data:', error);
            movieDetails.innerHTML = `<p>Failed to fetch movie data. ${error.message}</p>`;
        });
}


// Display movie data on page
function displayMovieData(data) {
    if (data.Response == 'True') {
        const movieHTML = `
       
        <div class="movie">
        <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450'}" alt="Movie Poster">
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
      </div>
        `;
        movieDetails.innerHTML = movieHTML;
    }
    else {
        movieDetails.innerHTML = `<p>No movie found. Please try another title.</p>`;
    }
}
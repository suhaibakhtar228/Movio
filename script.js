
const API_KEY = 'your api key here';

const NO_POSTER = 'OIP.webp';

const searchform = document.getElementById("searchform");

const searchinput = document.getElementById("searchinput");
const message = document.getElementById("msg");

const result = document.getElementById("result");

async function getMovies(query) {
    message.textContent = "loadingggg.....";
    result.innerHTML = "";

    const url = "https://www.omdbapi.com/?apikey=" + API_KEY + "&s=" + encodeURIComponent(query);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "False") {
            message.textContent = data.Error;
            return;
        }

        message.textContent = "Displaying results.....";
        showMovies(data.Search);
    }
    catch (err) {
        message.textContent = "err";
    }
}

function showMovies(movies) {
    for (const movie of movies) {
        const movieCard = document.createElement("a");
        const poster = document.createElement("img");
        const title = document.createElement("h3");
        const year = document.createElement("p");

        movieCard.className = "movie-card";
        movieCard.href = "https://www.imdb.com/title/" + movie.imdbID;
        movieCard.target = "_blank";
        movieCard.rel = "noopener";

        poster.src = movie.Poster === "N/A" ? NO_POSTER : movie.Poster;
        poster.alt = movie.Title + " poster";
        poster.onerror = function () {
            poster.onerror = null;
            poster.src = NO_POSTER;
        };

        title.textContent = movie.Title;
        year.textContent = movie.Year;

        movieCard.append(poster, title, year);
        result.appendChild(movieCard);
    }
}

searchform.addEventListener("submit", function(e) {
    e.preventDefault();
    const abc = searchinput.value.trim();

    getMovies(abc);
});
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGQxMmI1MjE4N2ExNDhjNGZlZTM2N2IzNzEwODA2ZSIsIm5iZiI6MTcyNjY4MTIyOC4wMjM2NDEsInN1YiI6IjY2ZTg3MjhlOWRmYmJkZjBlNmQwMjQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ih_w__uvqiTCVJfw2BV6U4f_S2SUS73lvyTMvgFyxY0",
  },
};

const movieContainer = document.querySelector("#movie_container");
const filters = document.querySelectorAll(".filter");

let endpoint = "upcoming";

const showMovies = (info) => {
  movieContainer.innerHTML = "";
  info.results.forEach((movie) => {
    const movieArticle = document.createElement("article");

    const movieTitle = document.createElement("h2");
    movieTitle.classList.add("movieTitle");
    movieTitle.innerText = movie.original_title;

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie_info");

    const poster = document.createElement("img");
    const desc = document.createElement("p");

    poster.src = ` https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpg`;
    desc.innerHTML += `<p>${movie.overview}</p>
            <p><span>Original title:</span> ${movie.original_title}</p>
            <p><span>Release date:</span> ${movie.release_date}</p>`;

    movieInfo.appendChild(poster);
    movieInfo.appendChild(desc);

    movieArticle.appendChild(movieTitle);
    movieArticle.appendChild(movieInfo);

    movieContainer.appendChild(movieArticle);
  });
};

const fetchMovies = () => {
  fetch(`https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`, options)
    .then((response) => response.json())
    .then((data) => {
      showMovies(data);
    })
    .catch((err) => console.error(err));
};

fetchMovies();

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    const selected_endpoint = e.target.id;
    endpoint = selected_endpoint;
    fetchMovies();
  });
});

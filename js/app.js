let popularMoviesHome;
let romanceMoviesHome;
let comedyMoviesHome;
let fantasyMoviesHome;
const submitForm = document.querySelector("#search");
const popular = document.getElementById("popularList");
const romance = document.getElementById("romanceList");
const comedy = document.getElementById("comedyList");
const fantasy = document.getElementById("fantasyList");
const imageURL = "https://image.tmdb.org/t/p/w500";

// Function to get movies
async function getMovies() {
  try {
    let response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=b7ef8f8a741775ea15a89eadb5f72420&language=es-MX&page=1"
    );
    if (response && response.data && response.data.results) {
      return response.data.results;
    }
  } catch (error) {
    console.log(error);
  }
}
popularMoviesHome = JSON.parse(sessionStorage.getItem("popular"));

if (!popularMoviesHome) {
  getMovies()
    .then((popularMovies) => {
      sessionStorage.setItem("popular", JSON.stringify(popularMovies));
      htmlSection(popularMovies, "popularList", popular, "popular");
    })
    .catch((e) => {
      console.log(e);
    });
} else {
  htmlSection(popularMoviesHome, "popularList", popular, "popular");
}

// Function to get movies
async function getRomance() {
  try {
    let response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=b7ef8f8a741775ea15a89eadb5f72420&with_genres=10749&language=es-MX"
    );
    if (response && response.data && response.data.results) {
      return response.data.results;
    }
  } catch (e) {
    console.log(e);
  }
}

romanceMoviesHome = JSON.parse(sessionStorage.getItem("romance"));

if (!romanceMoviesHome) {
  getRomance()
    .then((romanceMovies) => {
      sessionStorage.setItem("romance", JSON.stringify(romanceMovies));
      htmlSection(romanceMovies, "romanceList", romance, "romance");
    })
    .catch((e) => {
      console.log(e);
    });
} else {
  htmlSection(romanceMoviesHome, "romanceList", romance, "romance");
}

// Function to get comedy
async function getComedy() {
  try {
    let response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=b7ef8f8a741775ea15a89eadb5f72420&with_genres=35&language=es-MX"
    );
    if (response && response.data && response.data.results) {
      return response.data.results;
    }
  } catch (e) {
    console.log(e);
  }
}

comedyMoviesHome = JSON.parse(sessionStorage.getItem("comedy"));

if (!comedyMoviesHome) {
  getComedy()
    .then((comedyMovies) => {
      sessionStorage.setItem("comedy", JSON.stringify(comedyMovies));
      htmlSection(comedyMovies, "comedyList", comedy, "comedy");
    })
    .catch((e) => {
      console.log(e);
    });
} else {
  htmlSection(comedyMoviesHome, "comedyList", comedy, "comedy");
}

// Function to get fantasy
async function getFantasy() {
  try {
    let response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=b7ef8f8a741775ea15a89eadb5f72420&with_genres=14&language=es-MX"
    );
    if (response && response.data && response.data.results) {
      return response.data.results;
    }
  } catch (e) {
    console.log(e);
  }
}

fantasyMoviesHome = JSON.parse(sessionStorage.getItem("fantasy"));

if (!fantasyMoviesHome) {
  getFantasy()
    .then((fantasyMovies) => {
      sessionStorage.setItem("fantasy", JSON.stringify(fantasyMovies));
      htmlSection(fantasyMovies, "fantasyList", fantasy, "fantasy");
    })
    .catch((e) => {
      console.log(e);
    });
} else {
  htmlSection(fantasyMoviesHome, "fantasyList", fantasy, "fantasy");
}

function htmlSection(moviesList, id, htmlID, name) {
  const htmlMovieList = moviesList.slice(0, 15);
  htmlMovieList.forEach((element) => {
    const moviesContainer = document.createElement("div");
    moviesContainer.setAttribute("id", id);
    moviesContainer.classList.add("col", "center");
    moviesContainer.innerHTML = `<div>
    <a href="movieDetails.html?id=${element.id}?category=${name}" class="movie_title_link">
    <div class="movie">
            <img class="img-fluid" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="image">

            <div class="movie-info">
                <h3>${element.title}</h3>
                <span class="green">${element.vote_average}</span>
            </div>

            <div class="overview">
                <h3>Descripción</h3>
                <p>${element.overview}</p>
            </div>
        </div>
        </a>
    </div>`;
    htmlID.appendChild(moviesContainer);
  });
}

// Listen to search submit event
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchMovie = searchField.value.split(" ").join("").toLowerCase();
  const allMovies = popularMoviesHome
    .slice(0, 15)
    .concat(
      romanceMoviesHome.slice(0, 15),
      comedyMoviesHome.slice(0, 15),
      fantasyMoviesHome.slice(0, 15)
    );
  if (searchMovie) {
    let results = allMovies.filter(
      (x) => x.title.split(" ").join("").toLowerCase() === searchMovie
    );
    if (results.length > 0) {
      movieDialog(
        "¡Exito!",
        "La película que estás buscando existe",
        "#1da834"
      );
    } else {
      movieDialog(
        "¡Lo sentimos!",
        "La película que estás buscando no existe",
        "#e67b09"
      );
    }
  } else {
    movieDialog(
      "¡Error!",
      "Por favor ingresa un título de película",
      "#eb0707"
    );
  }

  submitForm.reset();
});

// Es la función que va a crear el dialog  para el balance
function movieDialog(title, existence, color) {
  console.log(existence);
  let blackDiv = document.createElement("div");
  blackDiv.className = "black__div";
  blackDiv.setAttribute("id", "blackDiv");

  let modalBalance = document.createElement("div");
  modalBalance.className = "modal__div";
  modalBalance.setAttribute("id", "modalBalance");
  modalBalance.style.width = "500px";
  modalBalance.innerHTML = `<div class="text-center my-3"><img
  id="operationImage"
  src="img/movie-icon.png"
  alt="Money icon"
  class="movie__icon mb-3"
/>
<h4 style="color: ${color}">${title}</h4>
<div>
<p class="balance">${existence} </p>
<button class="btn btn-primary w-50 mt-2" onclick="closeDialog(blackDiv)">Ok</button>
</div>
</div>`;
  document.body.appendChild(blackDiv);
  blackDiv.appendChild(modalBalance);
}

// Funcion para cerrar cualquier dialogo
function closeDialog(id) {
  const dialogID = id.id;
  let element = document.getElementById(dialogID);
  document.body.removeChild(element);
}

let moviesList;
const showMovieDetails = document.getElementById("showMovieDetails");
const url = window.location.search;

const movieId = url.split("?")[1].split("=")[1];
const movieCategory = url.split("?")[2].split("=")[1];

moviesList = JSON.parse(sessionStorage.getItem(movieCategory));

let movieDetail = moviesList.filter((x) => x.id === +movieId);

const movieCast = [];
async function getCast() {
  try {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b7ef8f8a741775ea15a89eadb5f72420&language=es-MX`
    );
    if (response && response.data && response.data.cast) {
      let castData = response.data.cast.slice(0, 10);
      for (let index = 0; index < castData.length; index++) {
        const element = castData[index];
        movieCast.push(element);
      }
      cast();
    }
  } catch (error) {
    console.log(error);
  }
}

getCast();

function cast() {
  movieCast.forEach((element) => {
    if (element.profile_path) {
      element.profile_path = `https://image.tmdb.org/t/p/original/${element.profile_path}`;
    } else {
      element.profile_path = "img/profile-picture.jpg";
    }
    const castContainer = document.createElement("div");
    castContainer.setAttribute("id", "castDiv");
    castContainer.classList.add(
      "col-12",
      "col-sm-12",
      "col-md-3",
      "col-lg-2",
      "col-xl-2",
      "col-xxl-2",
      "text-start"
    );
    castContainer.innerHTML = `<div>
    <img class="img-fluid pb-3 cast__image" src="${element.profile_path}" alt="image">
    <p>${element.name}</p>
    </div>`;
    castContainerDiv.appendChild(castContainer);
  });
}
cast();

const moviesContainer = document.createElement("div");
moviesContainer.setAttribute("id", "details");
moviesContainer.classList.add("col", "center");
moviesContainer.innerHTML = `<div>
<img class="img-fluid pb-3" src="https://image.tmdb.org/t/p/w500/${movieDetail[0].poster_path}" alt="image">
<h2 class="pb-3">${movieDetail[0].title}</h2>
<p class="text-start">${movieDetail[0].overview}</p>
<p class="text-start"><span class="atributte">Fecha de lanzamiento:</span> ${movieDetail[0].release_date}</p>
<p class="text-start"><span class="atributte">Título original:</span> ${movieDetail[0].original_title}</p>
<p class="text-start"><span class="atributte">Popularidad: </span> ${movieDetail[0].popularity}</p>
<p class="text-start"><span class="atributte">Puntuación: </span>${movieDetail[0].vote_average}</p>
<p class="text-start"><span class="atributte">Votos:</span> ${movieDetail[0].vote_count} </p>
<h3 class="text-start pb-3">Cast</h3>
<div class="container">
<div class="row" id="castContainerDiv"></div>
</div>
</div>`;
showMovieDetails.appendChild(moviesContainer);

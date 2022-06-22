let popularMoviesHome;

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
    })
    .catch((e) => {
      console.log(e);
    });
} else {
  console.log(popularMoviesHome);
}

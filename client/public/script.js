import { data } from '/data.js';
const ERROSTRING = `<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
		<style>
			body{
				padding: 0; margin: 0;
				font-family: 'Montserrat', sans-serif;
				font-weight: 800;
				background-color: #4343F9;
				color: #fff;
			}
			#root{
				width: 100%;
				height: 100vh;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 21px;
			}
		</style>
		<title>Not here</title>
	</head>
	<body>
		<div id="root">Rise your gaze to the sky<br/>than a bit back to the URL bar<br/>and check that link again</div>
	</body>`;
const createMovieDiv = movie => {
  const movieDiv = document.createElement("div")
  movieDiv.className = "post-it"
  movieDiv.id = movie.unique_id
  movieDiv.style.transform = `rotate(${Math.floor(Math.random() * 24) - 12}deg)`
  movieDiv.innerHTML = `<h2>${movie.title}</h2>`
  return movieDiv
}
const createGenreDivForSearch = genre => {
  const genreDiv = document.createElement("div")
  genreDiv.className = "post-it"
  genreDiv.id = genre.id
  genreDiv.style.transform = `rotate(${Math.floor(Math.random() * 24) - 12}deg)`
  genreDiv.innerHTML = `<h2>${genre.name.toUpperCase()}</h2>`
  return genreDiv
}
const createWriterList = movie => {
  const writersUl = document.createElement("ul")
  writersUl.innerHTML = "<h3>Writers:</h3>"
  movie.writers.forEach(writer => {
    writersUl.innerHTML += `<li>${data["professionals"][writer - 1]["name"]}</li>`
  });
  return writersUl
}
const createGenreList = inputGenre => {
  const genresUl = document.createElement("ul")
  data.movies.forEach(movie => {
    movie.genres.forEach(genre => {
      if (genre === inputGenre.id) {
        genresUl.innerHTML += `<li>${movie.title}</li>`

      }
    });

  })
  return genresUl
}
const createActorList = movie => {
  const directorUl = document.createElement("ul")
  directorUl.innerHTML = "<h3>Directors:</h3>"
  movie.directors.forEach(director => {
    directorUl.innerHTML += `<li>${data["professionals"][director - 1]["name"]}</li>`
  });
  return directorUl
}
const createDirectorList = movie => {
  const actorsUl = document.createElement("ul")
  actorsUl.innerHTML = "<h3>Actors:</h3>"
  movie.actors.forEach(actor => {
    actorsUl.innerHTML += `<li>${data["professionals"][actor - 1]["name"]}</li>`
  });
  return actorsUl
}

const createGenreButton = (tempGenre) => {
  const genreButton = document.createElement("button");
  genreButton.id = tempGenre.id
  genreButton.className = "genre-button"
  genreButton.innerHTML = `<h1>${tempGenre.name.toUpperCase()} </h1>`
  return genreButton

}

const displayMovieElement = (movie, element) => {
  const tempMovieDiv = createMovieDiv(movie)
  tempMovieDiv.append(createWriterList(movie), createDirectorList(movie), createActorList(movie))
  element.appendChild(tempMovieDiv)
}
const personListing = (input, element, professions) => { // "Actor", rootElement, ["actors"]
  if (professions.length === 1) {
    element.innerHTML = `<h1 id="text-marker"><a href = "http://127.0.0.1:9000">${input}s</a></h1>`
  }
  data.professionals.sort((currentPerson, nextPerson) => currentPerson.name.trim().localeCompare(nextPerson.name.trim())).forEach(professional => {
    if (Number.isInteger(input) ? professional.id === input : professional.roles.includes(input)) {
      const tempNameDiv = document.createElement("div")
      tempNameDiv.className = "post-it"
      tempNameDiv.style.transform = `rotate(${Math.floor(Math.random() * 24) - 12}deg)`
      const tempMovies = [];
      data.movies.sort((currentMovie, nextMovie) => currentMovie.year - nextMovie.year).forEach(movie => {
        if (professions.length > 1) {
          if (movie.directors.includes(input) || movie.writers.includes(input) || movie.actors.includes(input) && !tempMovies.includes(movie.title)) {
            tempMovies.push(movie.title)
          }
        } else {
          if (movie[professions[0]].includes(professional.id) && !tempMovies.includes(movie.title)) {
            tempMovies.push(movie.title)
          }
        }


      })
      const tempNameUl = document.createElement("ul")
      tempNameDiv.innerHTML = `<h2>${professional.name}</h2>
      <h3>Roles:</h3>
      ${professional.roles}
      <h3>Movies:</h3>`
      tempNameDiv.appendChild(tempNameUl)
      tempMovies.forEach(film => {
        const personFilm = document.createElement("li")
        personFilm.innerText = `${film}`
        tempNameUl.appendChild(personFilm)

      })
      element.appendChild(tempNameDiv)
    }
  })
}
const professionalSearch = (input, tempArray, element) => {
  data.professionals.forEach(prof => {
    if (Number.isInteger(parseInt(input))) {
      if (prof.id === parseInt(input)) {
        personListing(parseInt(input), element, ["actors", "directors", "writers"])
      }
    } else {
      if (prof.name.toLowerCase().includes(input.toLowerCase())) {
        personListing(prof.id, element, ["actors", "directors", "writers"])
        if (!tempArray.includes(prof.id)) {
          tempArray.push(prof.id)
        }

      }
    }
  })
}
const movieSearch = (input, tempArray, element) => {
  data.movies.forEach(movie => { //possible async needed
    // await new Promise(resolve => setTimeout(resolve, 1));
    if (Number.isInteger(parseInt(input))) {
      if (movie.unique_id === parseInt(input)) {
        displayMovieElement(movie, element)
      }
    } else {
      tempArray.forEach(id => {
        if (((movie.actors.includes(id)
          || movie.directors.includes(id)
          || movie.writers.includes(id))
          || movie.title.toLowerCase().includes(input.toLowerCase()))
          && !document.getElementById(`${movie.unique_id}`)) {
          displayMovieElement(movie, element)
        }
      })

    }


  })
}
const genreSearch = (input, element) => {
  data.genres.forEach(genre => {
    if (genre.id === parseInt(input) || genre.name.includes(input)) {
      const tempGenreDiv = createGenreDivForSearch(genre)
      tempGenreDiv.append(createGenreList(genre))
      element.appendChild(tempGenreDiv)
    }

  })
}
const movieCreation = element => {
  const buttonElement = document.createElement("button")
  buttonElement.id = "button"
  buttonElement.innerHTML = '<a href="http://127.0.0.1:9000">HAVER</a>'
  element.innerHTML = '<h1 id= "text-marker"><a href = "http://127.0.0.1:9000">Movies<a></h1>'
  document.body.appendChild(buttonElement)
  data.movies.forEach(movie => {
    displayMovieElement(movie, element)
  })
}
const runtimeList = (tempPage, element) => {
  const inputLength = tempPage.split("/")[1]
  if (inputLength === "short") {
    element.innerHTML = `<h1 id="text-marker"><a href = "http://127.0.0.1:9000">Short movies</a></h1>`
    data.movies.forEach(movie => {
      if (movie.runtime < 120) {
        displayMovieElement(movie, element)
      }
    })
  } else if (inputLength === "long") {
    element.innerHTML = `<h1 id="text-marker"><a href = "http://127.0.0.1:9000">Long movies</a></h1>`
    data.movies.forEach(movie => {
      if (movie.runtime >= 120) {
        displayMovieElement(movie, element)
      }
    })
  }
}
const movieById = (tempPage, element) => {
  const inputId = tempPage.split("/")[1]
  let isValid = false
  data.movies.forEach(movie => {
    if (movie.unique_id === parseInt(inputId)) {
      displayMovieElement(movie, element)
      isValid = true;
    }
  })
  if (!isValid) {
    const htmlElement = document.getElementById("definetly-not-html-tag")
    htmlElement.innerHTML = ERROSTRING
  }

}
const searchPage = element => {
  element.innerHTML = `<img src = "https://pngshare.com/wp-content/uploads/2021/06/Cool-Google-Logo-Designs-1.png"onclick = "location.href = 'http://127.0.0.1:9000'" ><input type = search id = "search-bar">`
  const searchField = document.createElement("div")
  const homePageButtons = document.createElement("div")
  homePageButtons.id = "home-buttons-div"
  homePageButtons.innerHTML += `<button class = "home-button" onclick = "location.href = 'http://127.0.0.1:9000/movies'">Movies</button>`
  homePageButtons.innerHTML += `<button class = "home-button" onclick = "location.href = 'http://127.0.0.1:9000/movies/short'">Short movies</button>`
  homePageButtons.innerHTML += `<button class = "home-button" onclick = "location.href = 'http://127.0.0.1:9000/movies/long'">Long movies</button>`
  homePageButtons.innerHTML += `<button class = "home-button" onclick = "location.href = 'http://127.0.0.1:9000/actors'">Actors</button>`
  homePageButtons.innerHTML += `<button class = "home-button" onclick = "location.href = 'http://127.0.0.1:9000/directors'">Directors</button>`
  homePageButtons.innerHTML += `<button class = "home-button" onclick = "location.href = 'http://127.0.0.1:9000/writers'">Writers</button>`
  homePageButtons.innerHTML += `<button class = "home-button" onclick = "location.href = 'http://127.0.0.1:9000/genres'">Genres</button>`
  searchField.appendChild(homePageButtons)
  searchField.id = "search.field"
  const searchInputField = document.getElementById("search-bar")
  element.appendChild(searchField)
  searchInputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchField.innerHTML = "";
      const searchInput = document.getElementById("search-bar").value
      const professionalIds = [];
      professionalSearch(searchInput, professionalIds, searchField)
      movieSearch(searchInput, professionalIds, searchField)
      genreSearch(searchInput, searchField)
    }


  });
}
const colorChanger = (className, array) => {
  const elements = document.querySelectorAll(className)
  elements.forEach(element => {
    if (array.includes(element.id)) {
      element.style.backgroundColor = "#ffdcff"

    } else {
      element.style.backgroundColor = "#fef6fe" 
    }

  })
}
const genreSelector = element => {
  element.innerHTML = `<h1 id="text-marker"><a href = "http://127.0.0.1:9000">Genres</a></h1>`
  const buttonsDiv = document.createElement("div")
  element.appendChild(buttonsDiv)
  buttonsDiv.id = "buttons-div"
  data.genres.sort((a, b) => a.name.localeCompare(b.name)).forEach(genre => buttonsDiv.appendChild(createGenreButton(genre)))
  const genreButtons = document.getElementsByClassName("genre-button")
  const genreDiv = document.createElement("div")
  element.appendChild(genreDiv)
  const genreIds = {}
  console.log(genreButtons);
  Array.from(genreButtons).forEach(genre => genre.addEventListener("click", function () {
    genreDiv.innerHTML = ""
    if (genreIds[genre.id]) {
      genreIds[genre.id] = false;
    } else {
      genreIds[genre.id] = true;
    }
    const trueIds = Object.keys(genreIds).filter((g) => genreIds[g])
    colorChanger(".genre-button", trueIds)
    data.movies.sort((currentMovie, nextMovie) => currentMovie.year - nextMovie.year).forEach(movie => {
      if (trueIds.length > 0
        && trueIds.every(g => movie.genres.includes(parseInt(g)))
        && !document.getElementById(`${movie.unique_id}`)) {
        displayMovieElement(movie, genreDiv)
      }
    })
    console.log(genreIds)
  }))

}


const loadEvent = function () {

  const page = window.location.pathname.substring(1);

  console.log("data: ", data);
  console.log("page: ", page);

  const rootElement = document.getElementById("root");
  if (page === "movies") {
    movieCreation(rootElement)
  } else if (page === "directors") {
    personListing("Director", rootElement, ["directors"])
  } else if (page === "writers") {
    personListing("Writer", rootElement, ["writers"])
  } else if (page === "actors") {
    personListing("Actor", rootElement, ["actors"])
  } else if (page.includes("movie/")) {
    movieById(page, rootElement)
  } else if (page.includes("movies/")) {
    runtimeList(page, rootElement)
  } else if (page === "genres") {
    genreSelector(rootElement)
  } else if (page === "") {
    searchPage(rootElement)
  }





}

window.addEventListener("load", loadEvent);
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
  movieDiv.innerHTML = `<h2>${movie.title}</h2>`
  return movieDiv
}
const createWriterList = movie =>{
  const writersUl = document.createElement("ul")
  writersUl.innerHTML = "<h3>Writers:</h3>"
  movie.writers.forEach(writer => {
    writersUl.innerHTML += `<li>${data["professionals"][writer-1]["name"]}</li>`
  });
  return writersUl
}
const createActorList = movie =>{
  const actorsUl = document.createElement("ul")
  actorsUl.innerHTML = "<h3>Actors:</h3>"
  movie.actors.forEach(actor => {
    actorsUl.innerHTML += `<li>${data["professionals"][actor-1]["name"]}</li>`
  });
  return actorsUl
}
const createDirectorList = movie =>{
  const directorsUl = document.createElement("ul")
   directorsUl.innerHTML = "<h3>Directors:</h3>"
  movie.directors.forEach(director => {
    directorsUl.innerHTML += `<li>${data["professionals"][director-1]["name"]}</li>`
  });
  return directorsUl
}
const createGenreDiv = tempGenre => {
  const genreDiv = document.createElement("div");
  genreDiv.id = tempGenre.id
  genreDiv.innerHTML = `<h2><u>${tempGenre.name.toUpperCase()}</u></h2>`
  return genreDiv

}
const actorListing = element => {
  data.professionals.sort((currentName,nextName) => currentName.name.trim().localeCompare(nextName.name.trim())).forEach(professional=>{
    if(professional.roles.includes("Actor")){
      let actorObj =  professionMovies(professional, "actors")
      console.log(actorObj);
      let actorNameDiv = document.createElement("ul")
      actorNameDiv.innerHTML=`<h3>${professional.name}'s movies:</h3>`
      actorObj.personFilms.forEach(film=>{
        let personFilm = document.createElement("li")
        personFilm.innerText=`${film}`
        actorNameDiv.appendChild(personFilm)
      })
      element.appendChild(actorNameDiv)
    }
  })
}
const directorListing = element =>{
  data.professionals.sort((currentName,nextName) => currentName.name.trim().localeCompare(nextName.name.trim())).forEach(professional=>{
    if(professional.roles.includes("Director")){
      let directorObj =  professionMovies(professional, "directors")
      let directorNameDiv = document.createElement("ul")
      directorNameDiv.innerHTML=`<h3>${professional.name}'s movies:</h3>`
      directorObj.personFilms.forEach(film=>{
        let personFilm = document.createElement("li")
        personFilm.innerText=`${film}`
        directorNameDiv.appendChild(personFilm)

      })
      element.appendChild(directorNameDiv)
    }
  })
}
const writerListing = element => {
  data.professionals.sort((currentName,nextName) => currentName.name.trim().localeCompare(nextName.name.trim())).forEach(professional=>{
    if(professional.roles.includes("Writer")){
      let writerObj =  professionMovies(professional, "writers")
      let writerNameDiv = document.createElement("ul")
      writerNameDiv.innerHTML=`<h3>${professional.name}'s movies:</h3>`
      writerObj.personFilms.forEach(film=>{
        let personFilm = document.createElement("li")
        personFilm.innerText=`${film}`
        writerNameDiv.appendChild(personFilm)

      })
      element.appendChild(writerNameDiv)
    }
  })
}
const displayMovieElement = (movie, element) =>{
  const tempMovieDiv = createMovieDiv(movie)
        tempMovieDiv.append(createWriterList(movie),createDirectorList(movie),createActorList(movie))
        element.appendChild(tempMovieDiv)  
}



const loadEvent = function () {

  const page = window.location.pathname.substring(1);

  console.log("data: ", data);
  console.log("page: ", page);

  const rootElement = document.getElementById("root");
  if (page === "movies") {
    data.movies.forEach(movie =>{
      displayMovieElement(movie, rootElement) 
    })
    
  // }else if(page === "actors"){
  //   movie.actors.forEach(actor =>{
  //     let actorMovies = document.createElement("ul")
  //     let actorsUl = document.createElement("ul")
  //     let actorLi = document.createElement("li")
  //     actorLi.innerHTML = `<li>${data["professionals"][actor-1]["name"]}</li>`
  //     actorMovies.innerHTML = `<li>${data["professionals"]}</li>`
  //     actorsUl.appendChild(actorLi)
  //     rootElement.appendChild(actorsUl)
  //   })
  }else if(page === "directors"){
    directorListing(rootElement)
    
  }else if(page === "writers"){
    writerListing(rootElement)
  }else if(page === "actors") {
    actorListing(rootElement)   
  }else if(page.includes("movie/")){
    const inputId = page.split("/")[1]
    let isValid = false
    data.movies.forEach(movie =>{
      if (movie.unique_id === parseInt(inputId)) {
        displayMovieElement(movie, rootElement)
        isValid = true;   
      }
    })
    if (!isValid) {
      const htmlElement = document.getElementById("definetly-not-html-tag")
      htmlElement.innerHTML= ERROSTRING
    }
  }else if(page.includes("movies/")){
    const inputLength = page.split("/")[1]
    if (inputLength === "short") {
      data.movies.forEach(movie=>{
        if (movie.runtime < 120 ){
          displayMovieElement(movie, rootElement)
        }
      })
    }else if (inputLength === "long"){
      data.movies.forEach(movie=>{
      if(movie.runtime >= 120){
        displayMovieElement(movie, rootElement)
      }
      })
    }
    
  }else if(page === "genres"){
    data.genres.sort((a,b) => a.name.localeCompare(b.name)).forEach(genre =>rootElement.appendChild(createGenreDiv(genre)))
    data.movies.forEach(movie => {
    movie.genres.forEach(genre => {
    const genreElement = document.getElementById(genre)
    displayMovieElement(movie, genreElement)
    })
    })
  }





}

window.addEventListener("load", loadEvent);









function professionMovies(professional, profession){
  let newObj = {
    name:professional.name,
    personFilms:[],
  }
  data.movies.sort((currentMovie, nextMovie) => currentMovie.year - nextMovie.year).forEach(movie=>{
    for (const prof of movie[profession]) {
      if(professional.id === prof){
        newObj.personFilms.push(movie.title)
      }
    }

  })
return newObj
}





 







// if(page === "genres"){
//   const rootElement = document.getElementById("root")
//   data.movies.forEach(movie=>{
//     genreSorting(movie, rootElement)
//   })
// }




  // function genreSorting(movie, rootElement){
  //   data.genres.forEach(genre=>{
  //     console.log("genre: ",genre)
  //     let currentGenreMovies =[]
  //     let currentGenre = document.createElement("ul")
  //     if(movie.genres.includes(genre.id)){
  //       currentGenreMovies.push(movie)
  
  //     }
  //     // console.log("currentGenreMovies: ", currentGenreMovies)
  //     currentGenreMovies.forEach(currentMovie=>{
  //       let movieLi = document.createElement("li")
  //       movieLi.innerText=`${currentMovie}`
  //       rootElement.appendChild(currentGenre)
  //       currentGenre.appendChild(movieLi)
  //     })
  //   })
  
  // }
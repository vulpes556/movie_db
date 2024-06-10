import { data } from '/data.js';
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


const loadEvent = function () {

  const page = window.location.pathname.substring(1);

  console.log("data: ", data);
  console.log("page: ", page);

  const rootElement = document.getElementById("root");
  data.movies.forEach(movie =>{
    const tempMovieDiv = createMovieDiv(movie)
    if (page === "movies") {
      tempMovieDiv.append(createWriterList(movie),createDirectorList(movie),createActorList(movie))
      rootElement.appendChild(tempMovieDiv)
    }else if(page === "actors"){
      tempMovieDiv.append(createActorList(movie))
      rootElement.appendChild(tempMovieDiv)
    }else if(page === "directors"){
      tempMovieDiv.append(createDirectorList(movie))
      rootElement.appendChild(tempMovieDiv)
    }else if(page === "writers"){
      tempMovieDiv.append(createWriterList(movie))
      rootElement.appendChild(tempMovieDiv)
    }

  })





}

window.addEventListener("load", loadEvent);


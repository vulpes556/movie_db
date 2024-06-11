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
  const displayMovieElement = (movie) =>{
    const tempMovieDiv = createMovieDiv(movie)
          tempMovieDiv.append(createWriterList(movie),createDirectorList(movie),createActorList(movie))
          rootElement.appendChild(tempMovieDiv)  
  }
  if (page === "movies") {
    data.movies.forEach(movie =>{
      displayMovieElement(movie) 
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
        rootElement.appendChild(directorNameDiv)
      }
    })
  }else if(page === "writers"){
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
        rootElement.appendChild(writerNameDiv)
      }
    })
  }else if(page === "actors") {
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
        rootElement.appendChild(actorNameDiv)
      }
    })
  }else if(page.includes("movie/")){
    const inputId = page.split("/")[1]
    data.movies.forEach(movie =>{
      if (movie.unique_id === parseInt(inputId)) {
        displayMovieElement(movie)   
      }
    })
  }else if(page.includes("movies/")){
    const inputLength = page.split("/")[1]
    if (inputLength === "short") {
      data.movies.forEach(movie=>{
        if (movie.runtime < 120 ){
          displayMovieElement(movie)
        }
      })
    }else if (inputLength === "long"){
      data.movies.forEach(movie=>{
      if(movie.runtime >= 120){
        displayMovieElement(movie)
      }
      })
    }
    
  }



}

window.addEventListener("load", loadEvent);









function professionMovies(professional, profession){
  let newObj = {
    name:professional.name,
    personFilms:[],
  }
  data.movies.forEach(movie=>{
    for (const prof of movie[profession]) {
      if(professional.id === prof){
        newObj.personFilms.push(movie.title)
      }
    }

  })
return newObj

}
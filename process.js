import * as fs from 'node:fs';

const movieDB = {
	professionals: [],
	movies: [],
	genres: []
}
const MAGICNUMBER = 42069 //for obvious reasons
const data = JSON.parse(fs.readFileSync("data.json"))
const allUniquePers = [];
let indexCounter = 1
const sortWriters = (tempMovie) => {
	const allWriters = tempMovie.writers.map(writer => writer)
	allWriters.forEach(person => {
		let tempObject = {
			id: 0,
			name: " ",
			roles: []
		}
		if (!allUniquePers.includes(person)) {
			allUniquePers.push(person)
			tempObject.id = indexCounter;
			tempObject.name = person
			tempObject.roles.push("Writer")
			movieDB.professionals.push(tempObject)
			indexCounter++
		}

	})


}
const sortDirectors = (tempMovie) => {
	const allDirectors = tempMovie.directors.map(director => director)
	// if (allDirectors.includes("Gary Scott Thompson")) {
	// 	console.log(true);
	// }	
	// console.log(allDirectors);
	allDirectors.forEach(person => {
		if (!allUniquePers.includes(person)) {
			let tempObject = {
				id: 0,
				name: " ",
				roles: []
			}
			allUniquePers.push(person)
			tempObject.id = indexCounter;
			tempObject.name = person
			tempObject.roles.push("Director")
			movieDB.professionals.push(tempObject)
			indexCounter++
		} else {
			movieDB.professionals.forEach(prof => {
					if (prof.name === person && !prof.roles.includes("Director")) {
						prof.roles.push("Director")
					}
			})
		}

	})


}
const sortActors = (tempMovie) => {
	const allActors = tempMovie.actors.map(actor => actor)
	allActors.forEach(person => {
		if (!allUniquePers.includes(person)) {
			let tempObject = {
				id: 0,
				name: " ",
				roles: []
			}
			allUniquePers.push(person)
			tempObject.id = indexCounter;
			tempObject.name = person
			tempObject.roles.push("Actor")
			movieDB.professionals.push(tempObject)
			indexCounter++
		} else {
			movieDB.professionals.forEach(prof => {
				if (prof.name === person && !prof.roles.includes("Actor")) {
					prof.roles.push("Actor")
				}
				// if (prof.name === person) {
				// 	if (!prof.roles.includes("Actor")) {
				// 		prof.roles.push("Actor")
				// 	}
				// }
			})
		}

	})


}
const sortGenres = (tempGenre) => {
			if (!movieDB.genres.some(genreObject => genreObject["name"] === tempGenre)) {  // ha egyszer sem szerepel benne, false értéket ad vissza
				let tempObject = {
					id: movieDB.genres.length+1,
					name: tempGenre
				}
				movieDB.genres.push(tempObject)
				
			}

	}



const genreIdReplacement = (movie) =>{
	movieDB.genres.forEach(uniqueGenre =>{
		movie.genres.forEach((genre, i)=>{
			if(genre === uniqueGenre.name){
				movie.genres[i] = uniqueGenre.id
			}
		})
	})
	return movie
}



const movieIdReplacement = (movie) => {
	movieDB.professionals.forEach(person => {
		movie.writers.forEach((writer, index) => {
			if (person.name === writer) {
				movie.writers[index] = person.id
			}
		})
		movie.actors.forEach((actor, index) => {
			if (person.name === actor) {
				movie.actors[index] = person.id
			}
		})
		movie.directors.forEach((director, index) => {
			if (person.name === director) {
				movie.directors[index] = person.id
			}
		})


	})
	return movie
}
data.movies.forEach(movie => {
	sortWriters(movie)
	sortDirectors(movie)
	sortActors(movie)
	movie.genres.forEach(genre => sortGenres(genre) )

})
fs.writeFileSync("tempData3.json", JSON.stringify(movieDB["genres"]))
fs.writeFileSync("tempData.json", JSON.stringify(movieDB.professionals))
const allNames = movieDB.professionals.map(person => person.name)
const uniqueNames = allNames.filter((value, index, array) => array.indexOf(value) === index)
console.log(allNames.length, uniqueNames.length);

let unique_id = 1
movieDB.movies = data.movies.map(movie => {
	movieIdReplacement(movie)
	genreIdReplacement(movie)
	movie["unique_id"] = unique_id
	unique_id++
	return movie

})
fs.writeFileSync("tempData2.json", JSON.stringify(movieDB.movies))









export { movieDB };

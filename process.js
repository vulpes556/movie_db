import * as fs from 'node:fs';

const movieDB = {
	professionals: [],
	movies: [],
	genres: []
}

const data = JSON.parse(fs.readFileSync("data.json"))
const allUniquePers = [];
let indexCounter = 1
const sortWriters = (tempMovie) => {
	const allWriters = tempMovie.writers.map(writer => writer)
	allWriters.forEach(person =>{
		let tempObject = {
			id: 0,
			name: " ",
			roles: []
		}
		if(!allUniquePers.includes(person)){
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
	allDirectors.forEach(person =>{
		if(!allUniquePers.includes(person)){
			let tempObject = {
				id: 0,
				name: " ",
				roles: []
			}
			allUniquePers.push(person)
			tempObject.id = indexCounter;
			tempObject.name = person
			tempObject.roles.push("Writer")
			movieDB.professionals.push(tempObject)
			indexCounter++
		}else{
			movieDB.professionals.forEach(prof =>{
				if (!prof.roles.includes("Director")) {
					prof.roles.push("Director")						
				}
			} )
		}

	})
	

}
const sortActors = (tempMovie) => {
	const allActors = tempMovie.actors.map(actor => actor)
	allActors.forEach(person =>{
		if(!allUniquePers.includes(person)){
			let tempObject = {
				id: 0,
				name: " ",
				roles: []
			}
			allUniquePers.push(person)
			tempObject.id = indexCounter;
			tempObject.name = person
			tempObject.roles.push("Writer")
			movieDB.professionals.push(tempObject)
			indexCounter++
		}else{
			movieDB.professionals.forEach(prof =>{
				if (prof.name === person) {
					if (!prof.roles.includes("Actor")) {
						prof.roles.push("Actor")						
					}
				}
			} )
		}

	})
	

}

data.movies.forEach(movie =>{
	sortWriters(movie)
	sortDirectors(movie)
	sortActors(movie)

})
fs.writeFileSync("tempData.json", JSON.stringify(movieDB.professionals))
const allNames = movieDB.professionals.map(person => person.name)
const uniqueNames = allNames.filter((value,index,array) => array.indexOf(value)===index)
console.log(allNames.length, uniqueNames.length);



export { movieDB };

'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5001;
const weatherKey = process.env.WEATHER_API_KEY;
const movieKey = process.env.MOVIE_API_KEY;
const axios = require('axios').default;

console.log('this is the port #', PORT);
console.log('this is the weather key', weatherKey);
console.log('this is the movie key', movieKey);

app.get('/weather', handleWeather);
app.get('/movies', handleMovie);

function handleMovie(request, response) {
    let movieQuery = request.query.year;
    console.log('beginning movie query');
	axios({
		method: 'get',
		url: `https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=${movieQuery}`,
		transformResponse: [
			function (data) {
				console.log('this is the first data object', data.title);
				let movieArray = [];
				for (let i = 0; i < data.length; i++) {
					let title = data[i].title;
					let overview = data[i].overview;
					let release_date = data[i].release_date;
					let backdrop = data[i].backdrop_path;
					let image = data[i].poster_path;
					
					movieArray.push({title: title, overview: overview, release_date: release_date, backdrop_path: backdrop, image_path: image});
					
				}
					// console.log(movieArray);
					return movieArray;
			}
		]
	})
		.then((res) => {
			// console.log(response.data);
			// response.send(res.data);
		})
		.catch((err) => {
			console.error(err);
		});
}

function handleWeather(request, response) {
	console.log('server side ', request.query);
	let cityQuery = request.query.city;
	let lonQuery = request.query.lon;
	let latQuery = request.query.lat;
	console.log(
		`server has recieved the following parameters: ${cityQuery} + ${lonQuery} + ${latQuery}`
	);
	axios({
		method: 'get',
		url: 'http://api.weatherbit.io/v2.0/forecast/daily',
		params: {
			city: cityQuery,
			lat: latQuery,
			lon: lonQuery,
			key: weatherKey,
		},
		transformResponse: [
			function (data) {
				// console.log('this is our data',  JSON.parse(data));
				let betterData = JSON.parse(data);
				let weatherArray = [];
				for (let i = 0; i < betterData.data.length; i++) {
					let description = betterData.data[i].weather.description;
					let dateTime = betterData.data[i].datetime;
					weatherArray.push({ description: description, datetime: dateTime });
				}
				return weatherArray;
			},
		],
	})
		.then((res) => {
			console.log(response.data);
			response.send(res.data);
		})
		.catch((err) => {
			console.error(err);
		});
}

// class Forecast {
// 	constructor(day) {
// 		console.log('day constructor', day.datetime);
// 		console.log('description constructor', day.weather.description);
// 		this.date = day.datetime;
// 		this.description = day.weather.description;
// 	}
// }

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5001;
const weatherKey = process.env.WEATHER_API_KEY;
const axios = require('axios').default;

console.log(PORT);
console.log(weatherKey);

app.get('/weather', handleWeather);

function formatData() {}

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

	// //get weather data
	// const cityWeather = weatherData.find(
	//     (city) => city.city_name.toLowerCase() === searchQuery.toLowerCase()
	// );
	// console.log('cityWeather', cityWeather.data);

	// //loop over weather data call constructor for building object from data.
	// const weatherArray = cityWeather.data.map((day) => new Forecast(day));

	// response.status(200).send(weatherArray);
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

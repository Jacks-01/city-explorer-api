'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import axios from 'axios';
app.use(cors());
// import { env } from 'process';
const PORT = process.env.PORT || 5001;
const weatherKey = process.env.WEATHER_API_KEY;
const axios = require('axios').default;
console.log(PORT);
console.log(weatherKey);
axios({
	method: 'get',
	url: 'http://api.weatherbit.io/v2.0/forecast/daily',
	params: {
		city: 'Cedar Rapids',
		key: weatherKey,
	}})
		.then((response) => {
			console.log(response.data);
		})
		.catch((err) => {
			console.error(err);
		})


// app.get('/weather', handleWeather);

// function handleWeather(request, response) {
// 	console.log('server side ', request.query);
// 	let searchQuery = request.query.city;
// 	console.log('server console.log', searchQuery);

// 	//get weather data
// 	const cityWeather = weatherData.find(
// 		(city) => city.city_name.toLowerCase() === searchQuery.toLowerCase()
// 	);
// 	console.log('cityWeather', cityWeather.data);

// 	//loop over weather data call constructor for building object from data.
// 	const weatherArray = cityWeather.data.map((day) => new Forecast(day));

// 	response.status(200).send(weatherArray);
// }

// class Forecast {
// 	constructor(day) {
// 		console.log('day constructor', day.datetime);
// 		console.log('description constructor', day.weather.description);
// 		this.date = day.datetime;
// 		this.description = day.weather.description;
// 	}
// }

// app.listen(PORT, () => {
// 	console.log(`Server listening on ${PORT}`);
// });

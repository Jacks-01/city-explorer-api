'use strict';

const Weather = {};
const weatherKey = process.env.WEATHER_API_KEY;
const axios = require('axios').default;
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 0 });

// const verifyCache = (req, res, next) => {
// 	try {
// 		const key = req.query.city;
//         console.log('this is our key inside of verifyCache', key)
// 		myKeys = myCache.keys();
// 		console.log(myKeys);

// 		if (cache.has(key)) {
// 			return res.status(200).json(cache.get(key));
// 		}
// 		return next();
// 	} catch (err) {
// 		throw new Error(err);
// 	}
// };

Weather.getForecast = async (request, response) => {
    // First, we are logging all keys that are in our cache
    // Second, we are defining the key, which is equal to our city name (request.query.city)
    // Third, IF the key is in the cache, return it. Otherwise make the API request.
	try {
		let myKeys = myCache.keys();
		console.log(myKeys);

		let key = request.query.city;
		console.log('this is our key inside of verifyCache', key);

		if (myCache.has(key)) {
			let value = myCache.get(key);
			console.log(
				`data we are sending back if query is in cache ${JSON.stringify(value)}`
			);
			return response.status(200).json(value);
		}
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
					let betterData = JSON.parse(data);
					let weatherArray = [];
					for (let i = 0; i < 3; i++) {
						let description = betterData.data[i].weather.description;
						let icon = betterData.data[i].weather.icon;
						let date = betterData.data[i].valid_date;

						weatherArray.push({
							description: description,
							date: date,
							icon: icon,
						});

						myCache.set(key, weatherArray);
					}

					let value = myCache.get(key);
					console.log(`values of current key: ${Object.entries(value)}`);
					// let myKeys = myCache.keys();
					// console.log('these are the keys', myKeys);
					return weatherArray;
				},
			],
		})
			.then((res) => {
				console.log('data we are sending back', res.data);
				response.send(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = Weather;

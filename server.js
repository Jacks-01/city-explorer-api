'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5001;
const movieKey = process.env.MOVIE_API_KEY;
const axios = require('axios').default;

const Weather = require('./weather');
app.get('/weather', Weather.getForecast);
app.get('/movies', handleMovie);

function handleMovie(request, response) {
    let movieQuery = request.query.year;
    console.log('beginning movie query');
	axios({
		method: 'get',
		url: `https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=${movieQuery}`,
		transformResponse: [
			function (data) {
				// console.log('this is the first data object', JSON.parse(data));
				let movieData = JSON.parse(data).results;
				let movieArray = [];
				for (let i = 0; i < movieData.length; i++) {
					let title = movieData[i].title;
					let overview = movieData[i].overview;
					let release_date = movieData[i].release_date;
					let backdrop = movieData[i].backdrop_path;
					let image = movieData[i].poster_path;
					
					movieArray.push({title: title, overview: overview, release_date: release_date, backdrop_path: backdrop, image_path: image});
					
				}
					return movieArray;
			}
		]
	})
		.then((res) => {
			console.log('logging response data before sending', res.data);
			response.send(res.data);
		})
		.catch((err) => {
			console.error(err);
		});
}



app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

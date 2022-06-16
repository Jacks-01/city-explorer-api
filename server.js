'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5001;
const axios = require('axios').default;
const Weather = require('./weather');
const Movies = require('./movies');

app.get('/weather', Weather.getForecast);
app.get('/movies', Movies.getMovies);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

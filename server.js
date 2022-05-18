'use strict';

let data = require('./data/weather.json');

// this library lets us access our .env file
require('dotenv').config();

// express is a server library
const express = require('express');

// initalizes the express library
const app = express();

// library that determines who is allowed to speak to our server
const cors = require('cors');

// this settting says that everyone is allowed to speak to our server
app.use(cors());

// we are getting the port variable from the .env file.
const PORT = process.env.PORT;

app.get('/weather', (request, response) => {
	console.log({ data: request.query.city});
	console.log({ express: request.query.city });
	response.send({ express: request.query.city });
});

app.get('/', (request, response) => {
    response.send({express: request.query.city})
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

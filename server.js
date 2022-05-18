'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5000;
let data = require('./data/weather.json');

class Forecast {

    constructor(date,description) {
        this.date = date;
        this.description = description;
    };
};



function getWeather() {
    let date = [];
    let description = [];

    data.find()



}


app.get('/weather', (request, response) => {
    response.send({ express: request.query.city });
	// console.log({ data: request.query.city});
	console.log({ express: request.query.city });
});

//Fallback
app.get('/', (request, response) => {
    response.send({express: request.query.city})
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

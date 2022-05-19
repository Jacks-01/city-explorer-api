'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5001;
let weatherData = require('./data/weather.json');

app.get('/weather', handleWeather);


function handleWeather(request, response){
    console.log('server side ',request.query);
        let searchQuery = request.query.city;
        console.log('server console.log', searchQuery);

        //get weather data
        const cityWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
        console.log('cityWeather', cityWeather.data);

        //loop over weather data call constructor for building object from data.
        const weatherArray = cityWeather.data.map(day => new Forecast(day));


        response.status(200).send([weatherArray]);

};


// app.get('/weather', (request, response) => {
//     //this gives us the city to map over the weather json object
//     response.send({ express: request.query.city });
//     let searchQuery =  request.query.city;
//     console.log(`search query is: ${searchQuery}`);
    

//     const cityWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
//     console.log('the variable city =', cityWeather);
    
//     const weatherArray = weatherData.map(day => new Forecast(day));
//     // response.status(200).send(weatherArray);
//     // console.log(description);
    
// });


class Forecast {

    constructor(day) {
        console.log('day constructor', day.datetime)
        console.log('description constructor', day.weather.description)
        this.date = day.datetime;
        this.description = day.weather.description;
    };
};

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


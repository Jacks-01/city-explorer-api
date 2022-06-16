'use strict';

const Weather = {};
const weatherKey = process.env.WEATHER_API_KEY;
const axios = require('axios').default;


Weather.getForecast = async (request, response) => {
    
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
                    for (let i = 0; i < 3; i++) {
                        let description = betterData.data[i].weather.description;
                        let icon = betterData.data[i].weather.icon;
                        let date = betterData.data[i].valid_date;
                        weatherArray.push({ description: description, date: date, icon: icon });
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
};

module.exports = Weather;
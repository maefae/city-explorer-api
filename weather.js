"use strict";

require("dotenv").config();

const axios = require("axios");

class Forecast {
  constructor(date, hightemp, lowtemp, desc) {
    this.description = `Low of ${lowtemp}, high of ${hightemp} with ${desc}`;
    this.date = date;
  }
}

async function handleWeather(req, res) {
  try {
    const { lat, lon } = req.query;

    const API = `https://api.weatherbit.io/v2.0/forecast/daily?city=seattle&key=${process.env.WEATHER_API_KEY}`;
    // const weather = data.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase())
    const response = await axios.get(API);

    res.send(
      response.data.data.map(
        (a) =>
          new Forecast(
            a.datetime,
            a.high_temp,
            a.low_temp,
            a.weather.description
          )
      )
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = handleWeather;

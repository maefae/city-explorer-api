"use strict";

require("dotenv").config();

const axios = require("axios");

let cache = require("./cache.js");

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
    const key = "weather-" + lat + lon;

    if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
      console.log("Cache hit");
    } else {
      console.log("Cache miss");
      cache[key] = {};
      cache[key].timestamp = Date.now();

      let weatherData = await axios.get(API);

      cache[key].data = weatherData.data.data.map(
        (a) =>
          new Forecast(
            a.datetime,
            a.high_temp,
            a.low_temp,
            a.weather.description
          )
      );
    }
    res.send(cache[key].data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = handleWeather;

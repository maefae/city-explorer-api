"use strict";

require("dotenv").config();

const axios = require("axios");
const { request } = require("express");

let cache = require("./cache.js");

class Movies {
  constructor(title) {
    this.title = title;
  }
}

async function handleMovies(req, res) {
  try {
    //ApI key, make a request to movie database

    const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.searchQuery}`;
    const key = "movie-" + req.query.searchQuery;

    if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
      console.log("Cache hit");
    } else {
      console.log("Cache miss");
      cache[key] = {};
      cache[key].timestamp = Date.now();

      let movieResults = await axios.get(API);
      //response needed later
      cache[key].data = movieResults.data.results.map((movie) => {
        return new Movies(movie.title);
      });
    }

    res.send(cache[key].data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = handleMovies;

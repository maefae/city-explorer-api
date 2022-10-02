"use strict";

require("dotenv").config();

const axios = require("axios");

class Movies {
  constructor(title) {
    this.title = title;
  }
}

async function handleMovies(req, res) {
  try {
    //ApI key, make a request to movie database

    const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.searchQuery}`;

    let movieResults = await axios.get(API);
    //response needed later
    movieResults = movieResults.data.results.map((movie) => {
      return new Movies(movie.title);
    });

    res.send(movieResults);
  } catch (error) {
    console.log(error);
  }
}
module.exports = handleMovies;

"use strict";
//This is our server

// Set up
// ------------------------

require("dotenv").config();
//express server
const express = require("express");
// Allows for cross origin resource sharing
const cors = require("cors");

//Start our server
const app = express();

const axios = require("axios");

//modules section
const handleWeather = require("./weather.js");

const handleMovies = require("./movies.js");

// Middleware
//The app.use() function is used to mount the specified middleware function(s) at the path which is being specified
app.use(cors());

//Declare our PORT variable
const PORT = process.env.PORT || 3001;

// Listening for connection
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

// Endpoints/routes
//--------------------------
app.get("/weather", handleWeather);

app.get("/movies", handleMovies);

app.get("/", (req, res) => {
  res.send("Hello from the home route!");
});

//getting movies onto backend site

// Catch all endpoints
app.get("*", (req, res) => {
  res.status(404).send("Page not Found");
});

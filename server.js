'use strict'
//This is our server


// Set up
// ------------------------

require('dotenv').config();
//express server
const express = require('express');
// Allows for cross origin resource sharing 
const cors = require('cors');

//load data
const data = require('./data/weather.json');
//Start our server
const app = express();

const axios = require('axios');

// Middleware 
//The app.use() function is used to mount the specified middleware function(s) at the path which is being specified 
app.use(cors());

//Declare our PORT variable
const PORT = process.env.PORT || 3001;

// Listening for connection
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));


// Endpoints:
//--------------------------

class Forecast {
    constructor(date, hightemp, lowtemp, desc){
        this.description = `Low of ${lowtemp}, high of ${hightemp} with ${desc}`
        this.date = date;
    }
}

app.get("/", (req, res) => {
    res.send('Hello from the home route!');
});

app.get('/weather', async (req,res) => {

try {
    const { lat, lon } = req.query

const API = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
// const weather = data.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase())
const response = await axios.get(API);
 
 res.send(response.data.data.map(a => new Forecast(a.datetime, a.high_temp, a.low_temp, a.weather.description)))
}
catch(error){

    console.log(error);
}

// const city_name = req.query.searchQuery

});



// Catch all endpoints

app.get('*', (req, res) => {
    res.status(404).send('Page not Found');
});



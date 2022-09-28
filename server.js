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
const data = require('./weather.json');
//Start our server
const app = express();

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
    constructor(date, hight, lowt, desc){
        this.description = `Low of ${lowt}, high of ${hight} with ${desc}`
        this.date = date;
    }
}

app.get("/", (req, res) => {
    res.send('Hello from the home route!');
});

app.get('/weather',(req,res) => {
// const city_name = req.query.searchQuery
const{searchQuery, lat, lon} = req.query
const weather = data.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase())
 res.send(weather.data.map(a => new Forecast(a.datetime, a.high_temp, a.low_temp, a.weather.description)))
});

// Catch all endpoints

app.get('*', (req, res) => {
    res.status(404).send('Page not Found');
});
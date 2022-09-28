Express Servers
Repl.it
https://replit.com/@AdamOwada/301d89-92722-Class-07#index.js

Overview
Today we will build our own custom Express server in Node.js. We will server our front end static files and dive more deeply into the WRRC.

Class Outline
Warm-up exercise
Review code challenges
Introduction of today's code challenge topic
Code review of lab assignment
Functional programming concepts
Express Servers
Code Demo
Lab Preview
Learning Objectives
Students will be able to
Describe and Define
Async
Server
REST
Express
Application Middleware
Route Middleware
cors
env variables
WRRC
Execute
Hook up a front end React application with a back end server
Create an Express server from scratch
Notes
What is a server?

What is express?

What is cors?

Why do we need a server?

Basic express server:

'use strict';

// this library lets us access our .env file
require('dotenv').config();

// express is a server library
const express = require('express');

// initalizes the express library
const app = express();

// library that determines who is allowed to speak to our server
const cors = require('cors');


// this settting says that everyone is allowed to speak to our server
app.use(cors());

// we are getting the port variable from the .env file.
const PORT = process.env.PORT;

// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get('/', (request, response) => {
  response.send('hello from the home route');
});

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
You can set up a route that your front-end can hit. Your server will return information on that route:

// FRONT-END
await axios.get('http://localhost:3001/cats');

// BACK-END
app.get('/cats', (request, response) => {
  response.send('cats are the best');
});
You can also send information from the front-end to the back-end as a query.

Queries live in the URL after the question mark: http://localhost:3000/?city=seattle

To send that query to the back-end via axios, you could write code like:

//FRONT-END
await axios.get('http://localhost:3001/city', {params: { city: 'seattle' }});

// BACK-END
app.get('city', (request, response) => {
  const city = reqeust.query.city;
  response.send(`you sent the city of ${city}`)
});


/**
 * Build a backend for an API of a website named vidly
 * This program can get, add, update, and delete any genre on the website
 * url = 'http://vidly.com/api/genres
 */


const express = require('express');
const Joi = require('joi');
const app = express();

//import router
const movies = require('./routes/genres')

app.use(express.json());
//use router
app.use('/', movies)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/vidly.com/api/genres...`)
})







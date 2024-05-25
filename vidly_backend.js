
/**
 * Build a backend for an API of a website named vidly
 * This program can get, add, update, and delete any genre on the website
 * url = 'http://vidly.com/api/genres
 */


const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

// home url
url = '/vidly.com/api/genres'

// intial genres
let genres = [
    { genre: "action", movies: ['Spider-man'] },
    { genre: "thriller", movies: ['IT'] },
    { genre: "comedy", movies: ['TED'] }

]

// get request
app.get(url, (req, res) => {
    res.send(genres);
})

// post request
/**
 * Validate the input genre and reject if the genre is already exist
 */
app.post(url, (req, res) => {
    const result = validateGenre(req, res)
    if (!result) return
    let genre = genres.find(g => g.genre === req.body.genre)

    //* reject if the genre is already exist
    if (genre) {
        res.status(400).send("Genre already exist");
    } else {
        genre = {
            genre: req.body.genre,
            movie: [req.body.movie]
        }
        genres.push(genre)
        res.send(genre)
    }


})


/**
 * * validate that the input must has at lease one char genre and at least one movie
 * * else raise the error
 * */
function validateGenre(req, res) {
    const schema = Joi.object({
        genre: Joi.string().min(1).required(),
        movies: Joi.array().items(Joi.any()).min(1).required()
    })

    let { error1 } = schema.validate(req.body)
    if (!error1) {
        console.log(error1)
        res.status(400).send("Genre is missing ")
        return false
    }

    let { error2 } = schema.validate(req.body.genre)
    if (!error2) {
        res.status(400).send("Movie is missing ")
        return false
    }

    return true
}

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/vidly.com/api/genres...`)
})







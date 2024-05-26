
const express = require('express')
// established routers
const router = express.Router();

// home url
url = '/vidly.com/api/genres'

// intial genres
let genres = [
    { genre: "action", movies: ['Spider-man'] },
    { genre: "thriller", movies: ['IT'] },
    { genre: "comedy", movies: ['TED'] }

]

// get request
router.get(url, (req, res) => {
    res.send(genres);
})

// post request
/**
 * Validate the input genre and reject if the genre is already exist
 */
router.post(url, (req, res) => {
    const result = validateGenre(req, res)
    if (!result) return
    let existed = existedGenre(req.body.genre)

    //* reject if the genre is already exist
    if (existed) {
        res.status(400).send("Genre already exist");
    } else {
        genre = {
            genre: req.body.genre,
            movies: [req.body.movies]
        }
        genres.push(genre)
        res.send(genre)
    }


})

// put request
/**
 * Check whether the genre existed
 * If it does, check if the movie is addded
 * If not, create a new object and routerend it to the origin
 */
router.put(url + '/:genre', (req, res) => {
    if (!validateGenre(req, res)) return;
    let genre = existedGenre(req.params.genre)
    if (genre) {
        req.body.movies.forEach(element => {
            if (!genre.movies.includes(element)) {
                genre.movies.push(element)
            }
        });

    } else {
        genre = {
            genre: req.body.genre,
            movies: req.body.movies
        }
        genres.push(genre);
    }
    res.send(genre)
})

// delete request
/**
 * Check whether the genre exist
 * If exist, delete and return it
 */
router.delete(url + '/:genre', (req, res) => {
    let genre = existedGenre(req.params.genre)
    if (genre) {
        const genreIndex = genres.indexOf(genre)
        genres.splice(genreIndex, 1)
        res.send(genre)
        return
    }
    res.send("The genre does not exist")
})

// get movies by genre
router.get(url + '/:genre', (req, res) => {
    let genre = existedGenre(req.params.genre)
    if (genre) {
        res.send(genre.movies)
        return
    }
    res.send("The genre does not exist")
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

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return false
    } else {
        return true
    }
}

/**
 * check whether the genre existed
 * @param {*} genre : genre of movie
 */
function existedGenre(genre) {
    let result = genres.find(g => g.genre === genre)
    return result
}

module.exports = router;
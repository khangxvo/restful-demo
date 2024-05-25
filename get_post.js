const express = require('express')
const app = express()
const Joi = require('joi')

//* to enable req.body.content
app.use(express.json());

//* array of available posts
const posts = [
    { id: 1, content: 'a' },
    { id: 2, content: 'b' },
    { id: 3, content: 'c' },
]

//* home page
app.get('/', (req, res) => {
    res.send("Welcomet to get posts service")
})

//* get all posts
app.get('/posts', (req, res) => {
    res.send(posts)
})

//* get post by id
app.get("/posts/:id", (req, res) => {
    // p here is the post in posts
    const post = idLookUp(req, res)
    res.send(post.content)
})

// ----------
/** 
 *  POST request handling */
app.post("/posts", (req, res) => {
    const result = validateContent(req, res)
    if (!result) {
        return;
    }

    const post = {
        id: posts.length + 1,
        content: req.body.content
    }

    posts.push(post);
    res.send(post)
})


//* look up the post by id
function idLookUp(req, res) {
    // p here is the post in posts
    const post = posts.find(p => p.id === parseInt(req.params.id))
    if (!post) {
        res.status(404).send("Post does not exist")
        return;
    }
    return post;
}


//* validate the content
function validateContent(req, res) {
    const schema = Joi.object({
        name: Joi.string().min(1).required()
    })

    const { error } = schema.validate(req.body.content)
    if (!error) {
        res.status(400).send('Content cannot be empty.')
    }

    return error;
}

/* Put Request Hanlding */
app.put('/posts/:id', (req, res) => {
    /**
     * TODO lookup the post
     * TODO validate the content
     * TODO update the endpoint
     */

    post = idLookUp(req, res);

    const result = validateContent(req, res)

    if (!result) {
        return;
    }

    post.content = req.body.content;
    res.send(post);
})

/** Delete Handling */
app.delete('/posts/:id', (req, res) => {
    // look up the post
    // If exist delete it and return it
    post = idLookUp(req, res);
    if (post) {
        const postid = posts.indexOf(post)
        posts.splice(postid, 1)
        res.send(post)
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
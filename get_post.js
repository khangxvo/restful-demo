const express = require('express')
const app = express()

// to enable req.body.content
app.use(express.json());

// array of available posts
const posts = [
    { id: 1, content: 'a' },
    { id: 2, content: 'b' },
    { id: 3, content: 'c' },
]

// home page
app.get('/', (req, res) => {
    res.send("Welcomet to get posts service")
})

// get all posts
app.get('/posts', (req, res) => {
    res.send(posts)
})

// get post by id
app.get("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id))
    if (!post) {
        res.status(404).send("Post does not exist")
    } else {
        res.send(post.content)
    }
})

// ----------
// POST request handling
app.post("/posts", (req, res) => {
    const post = {
        id: posts.length + 1,
        content: req.body.content
    }

    posts.push(post);
    res.send(post)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
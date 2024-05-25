const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.get('/someurl', (req, res) => {
    res.send([1, 2, 3])
})

app.get("/whatever", (req, res) => {
    res.send("Seriously?")
})

// app.get("/someurl/:name/:date", (req, res) => {
//     res.send(req.params.date)
// })

app.get("/someurl/:name/:date", (req, res) => {
    res.send(req.query)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
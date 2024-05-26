const express = require('express')
const app = express()
const log = require('./logger')
const config = require('config')

app.use(log)

app.set('view engine', 'pug');
app.set('views', './views')

console.log("App Name: ", config.get("name"))
console.log("Mail Server: ", config.get("mail.host"))
console.log("Password: ", config.get("mail.password"))

app.get('/', (req, res) => {
    res.render('index', { title: "My express app", message: 'Hello' })
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
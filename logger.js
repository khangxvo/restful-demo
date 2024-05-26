
function log(req, res, next) {
    console.log("Lodging...")
    next()
}

module.exports = log;

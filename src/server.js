require('./config/db')

const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = require('express')()

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }))
// Parse JSON bodies
app.use(bodyParser.json())
// Enable CORS
app.use(cors({ origin: true, credentials: true }))

app.get('/', (req, res) => res.send('Hello World!'))
app.use(routes)

module.exports = app

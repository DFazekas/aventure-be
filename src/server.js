const morgan = require('morgan')
require('./config/db')

const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = require('express')()

// Log all HTTP requests
app.use(morgan('dev'))
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }))
// Parse JSON bodies
app.use(bodyParser.json())
// Enable CORS
app.use(cors({ origin: true, credentials: true }))

app.get('/', (req, res) => res.send('Hello World!'))
app.use(routes)

// Error handling middleware should be added here
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})

module.exports = app

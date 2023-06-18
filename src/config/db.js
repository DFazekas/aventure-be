const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`DB is connected.`))
  .catch((err) => console.error(`Failed to connect to DB:`, err))

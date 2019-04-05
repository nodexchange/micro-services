const express = require('express')
const mongoose = require('mongoose')

const db = require('./config/keys').mongoURI

const app = express()

// initializing routes
const users = require('./routes/api/users')

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB error'))// err))

app.get('/', (req, res) => res.send('Hello world!'))

// use Routes
app.use('/api/users', users)

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8082

app.listen(port, () => console.log(`Server running on port ${port}`))
const express = require('express')
const mongoose = require('mongoose')

const cp = require('cookie-parser')
const bp = require('body-parser')

const passport = require('passport')

require('dotenv').config() 
//reads in configuration from a .env file and adds it process.env

const db = require('./config/keys').mongoURI

const app = express()

// Connect to MongoDB
mongoose.set('useCreateIndex', true)
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world!'))



app.use(passport.initialize())
require('./config/passport-config')(passport)
app.get('/path', passport.authenticate('jwt', {session: false}), (req,res) =>  res.send('PROTECTED ROUTE!'))

app.use(cp())
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())

// //custom Middleware for logging the each request going to the API
// app.use((req,res,next) => {
//   if (req.body) log.info(req.body)
//   if (req.params) log.info(req.params)
//   if(req.query) log.info(req.query)
//   log.info(`Received a ${req.method} request from ${req.ip} for                ${req.url}`)
// next()
// })

// //registers our authentication routes with Express.
// app.use('/users', require('./routes/user'))

const port = process.env.PORT || 8082

app.listen(port, () => console.log(`Server running on port ${port}`))
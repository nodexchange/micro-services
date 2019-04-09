//reads in configuration from a .env file and adds it process.env
require('dotenv').config() 

const express = require('express')
const path = require('path')
const logger = require('morgan');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('cookie-session');
const bodyParser = require('body-parser')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./config/keys').mongoURI
const app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// Connect to MongoDB
mongoose.set('useCreateIndex', true)
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

// app.use(passport.initialize())
// require('./config/passport-config')(passport)
// app.get('/path', passport.authenticate('jwt', {session: false}), (req,res) =>  res.send('PROTECTED ROUTE!'))

// initializing routes
// const users = require('./routes/api/users')
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// Register routes
app.use('/', require('./routes'));

const port = process.env.PORT || 8082

app.listen(port, () => console.log(`Server running on port ${port}`))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
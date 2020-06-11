require('dotenv').config();
const path = require('path');
const express = require('express');

//A library that helps us log the requests in the console
const logger = require('morgan');

// Used to setthe favicon for our app
const favicon = require('serve-favicon');

const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');

// Set up the database
require('./configs/db.config');

// Routers
const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');
const musicianRouter = require('./routes/musician.routes');
const venueRouter = require('./routes/venue.routes');

const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/gigzilla';

app.use(session({
    secret: 'my-secret-weapon',
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 60*60*24*1000 //60 sec * 60 min * 24hrs = 1 day (in milliseconds)
    },
    store: new MongoStore({
        url: MONGODB_URI,
        // mongooseConnection: mongoose.connection
        //time to live (in seconds)
        ttl: 60*60*24,
        autoRemove: 'disabled'
    })
}));

// Express View engine setup test
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// setting up the middleware to let it know where to find the favicon icon
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Sets up morgan in our middleware so that we can see the requests getting logged
app.use(logger('dev'));

// a body parser to allow us to parse form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// helps us use the cookies from each request
app.use(cookieParser());

// Routes middleware
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', musicianRouter);
app.use('/', venueRouter);

module.exports = app;

/* eslint-disable prefer-destructuring */
require('dotenv').config();
require('./config/databse');


const express = require('express');

const app = express();

// Middleware
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const methodOverride = require('method-override');
const morgan = require('morgan');
const isSignedIn = require('./middleware/isSignedIn');
const addUserToViews = require('./middleware/addUserToViews');

// CONTROLLERS
const authRouter = require('./routes/authRouter');
const applicationsCtrl = require('./controllers/applicationsCtrl');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI }),
  })
);

app.use(addUserToViews);

// PUBLIC ROUTES
app.get('/', async (req, res) => {
  if (req.session.user) {
    return res.redirect(`/users/${req.session.user._id}/apllications`)
  }
  res.render('index.ejs');
});

// Auth routes
app.use('/auth', authRouter);

// Customer middleware
app.use(isSignedIn);

// Applications routes
app.use('/users/:id/applications');

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

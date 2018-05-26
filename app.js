const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Connect to Mongoose
mongoose
  .connect('mongodb://localhost/vidjot-dev', {
    //useMongoClient: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars');

// Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method Override middleware
app.use(methodOverride('_method'));

// Express-session midleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect-flash middleware
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('succes_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Create Index Route
app.get('/', (req, res) => {
  const title = 'Welcome!';
  res.render('index', { title });
});

// Create About Route
app.get('/about', (req, res) => {
  const title = 'About';
  res.render('about', { title });
});

// Use Ideas routes
app.use('/ideas', ideas);

// Use Users routes
app.use('/users', users);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

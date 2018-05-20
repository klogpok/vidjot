const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to Mongoose
mongoose
  .connect('mongodb://localhost/vidjot-dev', {
    //useMongoClient: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Load Ideas Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars');

// Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Add Idea Route
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Process Form
app.post('/ideas', (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: 'Please add a title' });
  }

  if (!req.body.details) {
    errors.push({ text: 'Please add some details' });
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };

    new Idea(newUser).save().then(idea => {
      res.redirect('/ideas');
    });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

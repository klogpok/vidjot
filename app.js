const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const port = 5000;
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Users Login Route
router.get('/login', (req, res) => {
  res.send('login');
});

// Users Register Route
router.get('/register', (req, res) => {
  res.send('register');
});

module.exports = router;

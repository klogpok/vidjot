const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Users Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// Users Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

module.exports = router;

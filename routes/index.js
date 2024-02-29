/* global module */

const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://cse341-book-server.onrender.com',
  clientID: 'l5mVkkYCyomRd7k66bofYJJZuMvI2VeF',
  issuerBaseURL: 'https://dev-xr5aqnlm428ivf42.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

router.use('/', require('./swagger'));
router.use('/books', requiresAuth(), require('./books'));
router.use('/authors', requiresAuth(), require('./authors'));

module.exports = router;

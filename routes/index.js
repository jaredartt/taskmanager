const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://cse341-node-mn7d.onrender.com/', //it was http://localhost:3000 before
  clientID: 'rG52XpwIORiMu6XRkPQiT4KEDsKyiyFw',
  issuerBaseURL: 'https://dev-lz1fcwznq7vwnrwd.us.auth0.com'
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

router.use('/tasks', requiresAuth(), require('./tasks'));

module.exports = router;
const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

// SXFGW1UZHKRA5EXXRVD496TM

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL, //it was http://localhost:3000 before
  clientID: process.env.CLIENT_ID, // 'rG52XpwIORiMu6XRkPQiT4KEDsKyiyFw',
  issuerBaseURL: process.env.ISSUER_BASE_URL //https://dev-lz1fcwznq7vwnrwd.us.auth0.com
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
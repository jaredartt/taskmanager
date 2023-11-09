const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Replace with your Swagger documentation file path
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser'); 
const mongodb = require('./db/tasks');
const passport = require('passport');
const session = require('express-session');


// Passport config
require('./passport')(passport);

const app = express();
const port = 3000;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static('pages')) // Serve static files from the 'pages' directory
  .use(express.static('public')) // Serve static files from the 'pages' directory
  .use(session({
    secret: 'secret', // session secret
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create a session until something is stored
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  .use('/auth', require('./routes/auth'));

// Connect to MongoDB and start the server
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});

// mongoose.connect('mongodb://localhost:27017/taskmanager', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     app.listen(port);
//     console.log(`Connected to DB and listening on port ${port}`);
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error.message);
//   });

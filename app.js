const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Replace with your Swagger documentation file path
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const mongodb = require('./config/db');
const session = require('express-session');

connectDB()

const app = express();

const PORT = process.env.PORT || 3000;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))

app.listen(PORT, () => {
  console.log(`Server is at http://localhost:${PORT}`);
});

// Connect to MongoDB and start the server
// mongodb.initDb((err, mongodb) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on port ${port}`);
//   }
// });

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

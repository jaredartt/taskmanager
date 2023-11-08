const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Replace with your Swagger documentation file path

const express = require('express');
const bodyParser = require('body-parser'); 
const mongodb = require('./db/tasks');

const port = 3000;
const app = express();

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static('pages')) // Serve static files from the 'pages' directory
  .use(express.static('public')) // Serve static files from the 'pages' directory
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
 
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
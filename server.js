const express = require('express');
const bodyParser = require('body-parser'); 
const mongodb = require('./db/contacts');

const port = 3000;
const app = express();


app
  .use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  .use(bodyParser.json()) // for parsing application/json
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes/'));
 
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
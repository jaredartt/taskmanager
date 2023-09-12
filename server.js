const express = require('express');
const app = express();
const port = 3000;

// Require the controller
const homeController = require('./controllers/homeController');
// Define routes and use the controller function
app.get('/', homeController.displayHome);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send("Hello");
});

const port = 3000;
 
app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});




// require('dotenv').config(); // This line loads the environment variables from the .env file

// const express = require('express');
// const { MongoClient } = require('mongodb'); // Import MongoClient from the mongodb library
// const app = express();
// const port = 3000;

// // Require the controller
// const homeController = require('./controllers/homeController');

// // Define routes and use the controller function
// app.get('/', homeController.displayHome);

// // Create a new router for the '/contacts' routes
// const contactsRouter = require('./routes/contacts'); // Adjust the path accordingly

// // Use the '/contacts' route prefix for all contacts-related routes
// app.use('/contacts', contactsRouter);

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// const uri = process.env.MONGODB_URI; // Make sure to define `uri` after importing MongoClient

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Connect to MongoDB
// async function connectToMongo() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//     // You can now use `client.db()` to access your MongoDB database
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   }
// }

// connectToMongo();

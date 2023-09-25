const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv'); // To access environment variables

// Load environment variables from .env file
dotenv.config();
const mongoURI = process.env.MONGODB_URI;

// Define a GET route to retrieve all contacts
router.get('/', async (req, res) => {
  try {
    // Create a new MongoClient
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to the MongoDB database
    await client.connect();

    // Get a reference to the database
    const db = client.db(); // Assuming your database name is specified in the MongoDB URI

    // Query the "contacts" collection and retrieve all documents
    const contacts = await db.collection('contacts').find().toArray();

    // Close the MongoDB connection
    client.close();

    // Send the retrieved contacts as JSON response
    res.json(contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).json({ error: 'Error retrieving contacts' });
  }
});

module.exports = router;
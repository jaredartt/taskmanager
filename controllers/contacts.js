const { MongoClient, ObjectId } = require('mongodb');

// Function to connect to the database
async function connectToDatabase() {
  try {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Function to retrieve all contacts
async function getAllContacts() {
  const client = await connectToDatabase();
  try {
    const database = client.db("anotherTest");
    const collection = database.collection("contacts");
    const contacts = await collection.find({}).toArray();
    return contacts;
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    throw error;
  } finally {
    client.close();
  }
}

// Function to retrieve a single contact by ID
async function getContactById(contactId) {
  const client = await connectToDatabase();
  try {
    const database = client.db("anotherTest");
    const collection = database.collection("contacts");
    const contact = await collection.findOne({ _id: new ObjectId(contactId) });
    return contact;
  } catch (error) {
    console.error('Error retrieving contact by ID:', error);
    throw error;
  } finally {
    client.close();
  }
}

// Other CRUD functions (create, update, delete) can be added here as needed

module.exports = {
  connectToDatabase,
  getAllContacts,
  getContactById,
  // Export other functions as needed
};
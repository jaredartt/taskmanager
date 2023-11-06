const { MongoClient, ObjectId } = require('mongodb');

// Function to connect to the database.
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

// Function to create a new contact
async function createContact(newContactData) {
  const client = await connectToDatabase();
  try {
    const database = client.db("anotherTest");
    const collection = database.collection("contacts");

    // Insert the new contact into the collection
    const result = await collection.insertOne(newContactData);

    if (result.acknowledged) {
      const newContactId = result.insertedId; // Get the inserted ID
      const location = `/contacts/${newContactId}`;
      return { id: result.insertedId }; // Return the inserted ID
    } else {
      throw new Error('Failed to insert contact');
    }
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  } finally {
    client.close();
  }
}


// Function to update a contact by ID
async function updateContactById(contactId, updatedContactData) {
  const client = await connectToDatabase();
  try {
    const database = client.db("anotherTest");
    const collection = database.collection("contacts");

    // Update the contact based on its ID
    await collection.updateOne({ _id: new ObjectId(contactId) }, { $set: updatedContactData });
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  } finally {
    client.close();
  }
}

// Function to delete a contact by ID
async function deleteContactById(contactId) {
  const client = await connectToDatabase();
  try {
    const database = client.db("anotherTest");
    const collection = database.collection("contacts");

    // Delete the contact based on its ID
    await collection.deleteOne({ _id: new ObjectId(contactId) });
  } catch (error) {
    console.error('Error deleting contact:', error);
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
  createContact,
  updateContactById,
  deleteContactById,
  // Export other functions as needed
};
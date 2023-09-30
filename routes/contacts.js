const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { createContact } = require('../controllers/contacts'); // Import the createContact function

// GET all contacts
router.get(['/all', '/'], async (req, res) => {
  try {
    const contacts = await contactsController.getAllContacts();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await contactsController.getContactById(contactId);
    if (!contact) {
      res.status(404).send('Contact not found');
    } else {
      res.json(contact);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Other routes (POST, PUT, DELETE)

// POST route to create a new contact
router.post("/", async (req, res) => {
  try {
    const newContactData = req.body; // Get the new contact data from the request body

    // Call the createContact function to create the new contact
    const createdContact = await createContact(newContactData);

    // Respond with a 201 status code and the ID of the newly created contact
    res.status(201).json(createdContact);
  } catch (error) {
    // Handle errors, such as database connection issues or validation failures
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// PUT route to update a contact by ID
router.put('/:id', async (req, res) => {
  const contactId = req.params.id;
  try {
    // Extract updated contact data from req.body
    const updatedContactData = req.body;

    // Assuming you have a function like updateContactById in your controller
    await contactsController.updateContactById(contactId, updatedContactData);

    // Return a 204 status code to indicate success (no content)
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE route to delete a contact by ID
router.delete('/:id', async (req, res) => {
  const contactId = req.params.id;
  try {
    // Assuming you have a function like deleteContactById in your controller
    await contactsController.deleteContactById(contactId);

    // Return a 200 status code to indicate success
    res.status(200).send('Contact deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
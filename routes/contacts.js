const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

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

// Other routes (POST, PUT, DELETE) can be defined here

module.exports = router;






// // We can import routes here thanks to the Express function Router()
// const routes = require('express').Router();
// const controller = require('../controllers/homeController');

// routes.get('/', controller.normalRoute);
// routes.get('/jared', controller.JaredRoute);
// routes.get('/ruben', controller.RubenRoute);
// routes.get('/pedro', controller.PedroRoute);

// module.exports = routes;
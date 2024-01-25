/* global module */

const express = require('express');
const router = express.Router();
const contactsMethod = require('../controllers/contacts');

// Gets one contact
router.get('/:id', contactsMethod.getOne);

// Gets all contacts
router.get('/', contactsMethod.getContacts);

// Update a contact
router.put('/:id', contactsMethod.updateContact);

// Delete a contact
router.delete('/:id', contactsMethod.deleteContact);

// Create a new contact
router.post('/', contactsMethod.createContact);

module.exports = router;

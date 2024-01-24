/* global module */

const express = require('express');
const router = express.Router();

// Methods for communication
const contactsMethod = require('../controllers/contacts');

// Gets one contact
router.get('/:id', contactsMethod.getOne);

// Local json contacts
//router.get('/contacts', contactsMethod.getLocalContacts);

// Gets all contacts
router.get('/', contactsMethod.getContacts);

module.exports = router;

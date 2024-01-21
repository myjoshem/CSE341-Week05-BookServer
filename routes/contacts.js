const express = require('express');
const router = express.Router();

//methods for comm with 
const contactsMethod = require('../controllers/contacts');

//gets all contacts
router.get('/', contactsMethod.getContacts);
//gets one contact
router.get('/:id', contactsMethod.getOne);

module.exports = router;
const express = require('express');
const router = express.Router();
const localContacts = require('../data/local_contacts.json');

router.get('/contacts', (req, res) => {
  res.json(localContacts);
});

module.exports = router;
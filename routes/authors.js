/* global module */

const express = require('express');
const router = express.Router();
const authorsMethod = require('../controllers/authors');
const validation = require('../middleware/validate');

// Gets all books
router.get('/', authorsMethod.getMany);

// Gets one contact
router.get('/:id', authorsMethod.getOne);

// Create a new contact
// router.post('/', validation.save, authorsMethod.create);
router.post('/', validation.saveAuthors, authorsMethod.create);
// Update a contact
router.put('/:id', validation.saveAuthors, authorsMethod.update);

// Delete a contact
router.delete('/:id', authorsMethod.deleteItem);

module.exports = router;

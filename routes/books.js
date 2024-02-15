/* global module */

const express = require('express');
const router = express.Router();
const booksMethod = require('../controllers/books');

// Gets all books
router.get('/', booksMethod.getBooks);

// Gets one contact
router.get('/:id', booksMethod.getOne);

// Create a new contact
router.post('/', booksMethod.createBook);

// Update a contact
router.put('/:id', booksMethod.updateBook);

// Delete a contact
router.delete('/:id', booksMethod.deleteBook);

module.exports = router;

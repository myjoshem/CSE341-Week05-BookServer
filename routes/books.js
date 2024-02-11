/* global module */

const express = require('express');
const router = express.Router();
const booksMethod = require('../controllers/books');

// Gets one contact
router.get('/:id', booksMethod.getOne);

// Gets all books
router.get('/', booksMethod.getBooks);

// Update a contact
router.put('/:id', booksMethod.updateBook);

// Delete a contact
router.delete('/:id', booksMethod.deleteBook);

// Create a new contact
router.post('/', booksMethod.createBook);

module.exports = router;

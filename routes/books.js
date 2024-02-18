/* global module */

const express = require('express');
const router = express.Router();
const booksMethod = require('../controllers/books');
const validation = require('../middleware/validate');

// Gets all books
router.get('/', booksMethod.getBooks);

// Gets one contact
router.get('/:id', booksMethod.getOne);

// Create a new contact
router.post('/', validation.saveBook, booksMethod.createBook);

// Update a contact
router.put('/:id', validation.saveBook, booksMethod.updateBook);

// Delete a contact
router.delete('/:id', booksMethod.deleteBook);

module.exports = router;

/* global module */

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getBooks(req, res) {
  try {
    const db = await mongodb.getDb();
    const result = await db.collection('books').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getOne = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = new ObjectId(req.params.id);
    const result = await db.collection('books').findOne({ _id: userId });

    if (!result) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createBook = async (req, res) => {
  try {
    const db = await mongodb.getDb();

    // Extract data from the request body
    const { title, author, description, genre, publication_date, language, rating } = req.body;

    // Validate required fields
    if (!title || !author || !description || !genre || !publication_date || !language || !rating ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new contact
    const result = await db.collection('books').insertOne({
      title,
      author,
      description,
      genre,
      publication_date,
      language
    });

    // Return the new contact id in the response body
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = new ObjectId(req.params.id);

    // Extract data from the request body
    const { title, author, description, genre, publication_date, language, rating } = req.body;

    // Validate required fields
    if (!title || !author || !description || !genre || !publication_date || !language || !rating ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Update the contact
    const result = await db
      .collection('books')
      .updateOne(
        { _id: userId },
        { $set: { title, author, description, genre, publication_date, language, rating } }
      );

    // Check if the contact was updated successfully
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Return HTTP status code representing successful completion
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = new ObjectId(req.params.id);

    // Delete the contact
    const result = await db.collection('books').deleteOne({ _id: userId });

    // Check if the contact was deleted successfully
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Return HTTP status code representing successful completion
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getBooks,
  getOne,
  createBook,
  updateBook,
  deleteBook
};

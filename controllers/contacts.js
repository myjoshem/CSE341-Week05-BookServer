/* global module */

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getContacts(req, res) {
  try {
    const db = await mongodb.getDb();
    const result = await db.collection('contacts').find().toArray();

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
    const result = await db.collection('contacts').findOne({ _id: userId });

    if (!result) {
      res.status(404).json({ error: 'Contact not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createContact = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    
    // Extract data from the request body
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new contact
    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });

    // Return the new contact id in the response body
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateContact = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = new ObjectId(req.params.id);
    
    // Extract data from the request body
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Update the contact
    const result = await db.collection('contacts').updateOne(
      { _id: userId },
      { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );

    // Check if the contact was updated successfully
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Return HTTP status code representing successful completion
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = new ObjectId(req.params.id);

    // Delete the contact
    const result = await db.collection('contacts').deleteOne({ _id: userId });

    // Check if the contact was deleted successfully
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Return HTTP status code representing successful completion
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getContacts,
  getOne,
  createContact,
  updateContact,
  deleteContact,
};
/* global module */

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getContacts(req, res) {
  try {
    const db = await mongodb.getDb(); // Use the getDb function
    const result = await db.collection('contacts').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/* const getOne = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = req.params.id;

    // Validate userId format
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const result = await db.collection('contacts')
      .findOne({ _id: new ObjectId(userId) });

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
}; */

const getOne = async (req, res) => {
  try {
    const db = await mongodb.getDb(); // Use the getDb function
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

const getLocalContacts = (req, res) => {
  res.json('../data/contacts');
};

module.exports = {
  getContacts,
  getOne,
  getLocalContacts
};

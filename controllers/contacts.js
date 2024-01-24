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

const getOne = async (req, res) => {
  try {
    const db = await mongodb.getDb(); // U
    const userId = new ObjectId(req.params.id);
    const result = await db.collection('contacts')
      .findOne({ _id: userId })
      .toArray();

    if (result.length === 0) {
      res.status(404).json({ error: 'Contact not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
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

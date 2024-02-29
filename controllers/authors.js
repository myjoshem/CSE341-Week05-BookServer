/* global module */

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const dbTitle = 'authors';

// Validate required fields with this utility function
function checkData(req) {
  if (!req.author || !req.bio) {
    return true;
  } else {
    return false;
  }
}

async function getMany(req, res) {
  try {
    const db = await mongodb.getDb();
    const result = await db.collection(dbTitle).find().toArray();

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
    const result = await db.collection(dbTitle).findOne({ _id: userId });

    if (!result) {
      res.status(404).json({ error: 'Content not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const db = await mongodb.getDb();

    // Extract data from the request body
    const { author, bio } = req.body;

    // Validate required fields
    if (checkData(req)) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new contact
    const result = await db.collection(dbTitle).insertOne({ author, bio });

    // Return the new contact id in the response body
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = new ObjectId(req.params.id);

    // Extract data from the request body
    const { author, bio } = req.body;

    // Validate required fields
    if (checkData(req)) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Update the contact
    const result = await db
      .collection(dbTitle)
      .updateOne({ _id: userId }, { $set: { author, bio } });

    // Check if the contact was updated successfully
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Return HTTP status code representing successful completion
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    const userId = new ObjectId(req.params.id);

    // Delete the contact
    const result = await db.collection(dbTitle).deleteOne({ _id: userId });

    // Check if the contact was deleted successfully
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Return HTTP status code representing successful completion
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getMany,
  getOne,
  create,
  update,
  deleteItem
};

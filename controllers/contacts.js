const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect');

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

const getOne = async (req, res, next) => {
  const userId = req.params.id;

// Validate that userId is a valid ObjectId
if (!ObjectId.isValid(userId)) {
  return res.status(400).json({ error: 'Invalid ObjectId' });
}

// If validation passes, create the ObjectId
const objectId = new ObjectId(userId);
  try {
    const db = await mongodb.getDb(); // Use the getDb function
    const result = await db.collection('contacts').find({ _id: userId }).toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getContacts,
  getOne,
};

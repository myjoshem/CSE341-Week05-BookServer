/* global process, module */

const dotenv = require('dotenv');
dotenv.config(); // Move dotenv.config() to be called before using process.env
const MongoClient = require('mongodb').MongoClient;

let _db;

const connectToDatabase = async () => {
  if (_db) {
    console.log('Db is already initialized!');
    return _db;
  }
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      tls: true, // Add this option for TLS support
     // tlsAllowInvalidCertificates: true, // Optional: Allow invalid certificates (useful for testing, not recommended for production)
    });

    _db = client.db();
    console.log('Connected to MongoDB');
    return _db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

const getDb = async () => {
  if (!_db) {
    throw new Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  connectToDatabase,
  getDb
};

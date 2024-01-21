const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongodb = require('./db/connect'); // Assuming connect.js exports connectToDatabase

const PORT = process.env.PORT || 8080;

app.use('/', require('./routes/contacts'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/', require('./routes'));

const startServer = async () => {
  try {
    // Use the outer mongodb variable, not redeclare it
    const db = await mongodb.connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
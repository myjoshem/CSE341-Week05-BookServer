/* global process */
const express = require('express');
const mongodb = require('./db/connect'); // Assuming connect.js exports connectToDatabase
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const routes = require('./routes/contacts.js');
app.use('/', routes);

const startServer = async () => {
  try {
    // If you don't plan on using db within the function, you can remove it
    await mongodb.connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();

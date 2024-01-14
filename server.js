const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use('/', require('./routes'));

app.listen(3000, () => {
    console.log(`console running on port ${port}`);
});


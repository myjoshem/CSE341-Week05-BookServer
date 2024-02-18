const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My MongoDB API',
    description: 'Books API'
  },
  host: 'cse341-book-server.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

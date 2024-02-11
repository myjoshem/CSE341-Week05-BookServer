const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My MongoDB API',
    description: 'Books API'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Manager API',
    description: "Let's get your work done!"
  },
  host: 'taskmanager-cega.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
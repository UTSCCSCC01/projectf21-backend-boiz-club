const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'PawsUp API',
      version: '1.0.0',
      description: 'PawsUp API Information',
      contact: {
        name: 'Amazing dev',
      },
      servers: ['http://localhost:8080'],
    },
  },
  apis: ['./api/swaggerDoc.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;

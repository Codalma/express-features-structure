import * as process from 'process';

const dotenv = require('dotenv');
dotenv.config();

const port = Number(
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_PORT
    : process.env.DEV_PORT
);

export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Express REST API',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    servers: [{ url: `http://localhost:${port}/api/` }],
  },
  apis: ['./src/presentation/**/*.router.ts'],
};

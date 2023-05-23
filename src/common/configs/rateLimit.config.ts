import rateLimit from 'express-rate-limit';

const dotenv = require('dotenv');

dotenv.config();

const period = Number(process.env.LIMIT_PERIOD);
const maxRequests = Number(process.env.LIMIT_MAX_REQUESTS);

export const limiter = rateLimit({
  windowMs: period,
  max: maxRequests,
  message: 'Too many requests from this IP, please try again later',
});

import { winstonLogger } from '@infrastructure/configs/winston.config';
const morgan = require('morgan');

const stream = {
  write: (message: string) => winstonLogger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

export const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

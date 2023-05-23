import winston, { Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'info';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info: winston.Logform.TransformableInfo) =>
      `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const fileRotateFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info: winston.Logform.TransformableInfo) =>
      `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const errorFileTransport = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  format: fileRotateFormat,
});

const allFileTransport = new DailyRotateFile({
  filename: 'logs/all-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: level(),
  format: fileRotateFormat,
});

const consoleTransport = new winston.transports.Console({
  format: consoleFormat,
  level: level(),
});

const transports = [consoleTransport, errorFileTransport, allFileTransport];

export const winstonLogger: Logger = winston.createLogger({
  levels,
  transports,
});

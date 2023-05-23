import express, { Application } from 'express';
import helmet from 'helmet';

import {
  swaggerOptions,
  corsConfig,
  limiter,
  morganMiddleware,
  winstonLogger,
} from '@infrastructure/configs';
import { WinstonLibrary } from '@infrastructure/libraries';

import { appRouter } from '@presentation/App.router';
import { userRouter } from '@presentation/routes';
import { ErrorHandlerMiddleware } from '@presentation/middlewares';

import { LoggerService } from '@application/services';
import { ILoggerService } from '@domain/services';
import { IErrorHandlerMiddleware } from '@presentation/interfaces';

const winstonLibrary: ILoggerService =
  WinstonLibrary.getInstance(winstonLogger);
const logger: ILoggerService = LoggerService.getInstance(winstonLibrary);

const errorHandler: IErrorHandlerMiddleware = new ErrorHandlerMiddleware(
  logger
);

const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const xss = require('xss-clean');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app: Application = express();

app.use(cors(corsConfig));
app.use(helmet());
app.use(xss());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(morganMiddleware);

// TODO fix and enable rate limit
// app.use(rateLimit(limiter));

app.use('/api', appRouter.router);
appRouter.addRoute('/users', userRouter.router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler.execute);

module.exports = app;

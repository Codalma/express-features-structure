import { Server } from 'http';

import { winstonLogger } from '@infrastructure/configs';
import { WinstonLibrary } from '@infrastructure/libraries';
import { LoggerService } from '@application/services';
import { ILoggerService } from '@domain/services';
import * as process from 'process';

const dotenv = require('dotenv');

const winstonLibrary = WinstonLibrary.getInstance(winstonLogger);
const logger = LoggerService.getInstance(winstonLibrary);

const http = require('http');
const app = require('../../presentation/app');

dotenv.config();

export class AppServer {
  private server: Server;
  private logger: ILoggerService;
  private readonly port: number;

  constructor(server: Server, logger: ILoggerService, port: number) {
    this.server = server;
    this.logger = logger;
    this.port = port;
  }

  listen() {
    this.server.listen(this.port, () => {
      this.logger.logInfo(`Server started and listening on port ${port}.`);
    });
  }
}

const port = Number(
  process.env.PORT || // platforms like heroku needs $PORT variable
    (process.env.NODE_ENV === 'production'
      ? process.env.PROD_PORT
      : process.env.DEV_PORT)
);

const server: Server = http.createServer(app);

const appServer = new AppServer(server, logger, port);

appServer.listen();

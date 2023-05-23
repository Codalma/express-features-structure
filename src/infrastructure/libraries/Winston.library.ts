/* eslint-disable  no-use-before-define, no-useless-constructor,@typescript-eslint/no-empty-function */
import { Logger } from 'winston';

import { ILoggerService } from '@domain/services';

export class WinstonLibrary implements ILoggerService {
  private static instance: WinstonLibrary;
  private winstonLogger: Logger;

  private constructor(winstonLogger: Logger) {
    this.winstonLogger = winstonLogger;
  }

  public static getInstance(logger: Logger): WinstonLibrary {
    if (!WinstonLibrary.instance) {
      WinstonLibrary.instance = new WinstonLibrary(logger);
    }

    return WinstonLibrary.instance;
  }

  public logInfo(info: string): void {
    this.winstonLogger.info(info);
  }

  public logWarn(warn: string): void {
    this.winstonLogger.warn(warn);
  }

  public logError(error: string): void {
    this.winstonLogger.error(error);
  }

  public logHttp(http: string): void {
    this.winstonLogger.http(http);
  }

  public logDebug(debug: string): void {
    this.winstonLogger.debug(debug);
  }
}

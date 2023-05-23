/* eslint-disable no-use-before-define */
import { ILoggerService } from '@domain/services';

export class LoggerService {
  private static instance: LoggerService;
  private logger: ILoggerService;

  private constructor(logger: ILoggerService) {
    this.logger = logger;
  }

  public static getInstance(logger: ILoggerService): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService(logger);
    }

    return LoggerService.instance;
  }

  public logInfo(info: string) {
    return this.logger.logInfo(info);
  }

  public logWarn(warn: string) {
    return this.logger.logWarn(warn);
  }

  public logError(error: string) {
    return this.logger.logError(error);
  }

  public logHttp(http: string) {
    return this.logger.logHttp(http);
  }

  public logDebug(debug: string) {
    return this.logger.logDebug(debug);
  }
}

import { ILoggerService } from '@domain/services';

export abstract class BaseController {
  logger: ILoggerService;
  protected constructor(logger: ILoggerService) {
    this.logger = logger;
  }
}

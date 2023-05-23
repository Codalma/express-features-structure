import { ILoggerService } from '@common/interfaces';

export abstract class BaseController {
  logger: ILoggerService;
  protected constructor(logger: ILoggerService) {
    this.logger = logger;
  }
}

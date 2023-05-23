/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

import { AppError } from '@common/exceptions';
import { ILoggerService, IErrorHandlerMiddleware } from '@common/interfaces';

export class ErrorHandlerMiddleware implements IErrorHandlerMiddleware {
  private logger: ILoggerService;

  constructor(logger: ILoggerService) {
    this.logger = logger;
  }

  execute = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      this.logger.logError(
        `Operational error [${error.code}]: ${error.message}`
      );
      res.status(error.code).json({ error: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error.' });
      this.logger.logError(`Program error [500]: ${error.message}`);
      process.exit(1);
    }
  };
}

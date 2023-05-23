import { Request, Response, NextFunction } from 'express';

export interface IErrorHandlerMiddleware {
  execute(error: Error, req: Request, res: Response, next: NextFunction): void;
}

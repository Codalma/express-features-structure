import { ILoggerService } from '@domain/services';

export const loggerServiceMock: ILoggerService = {
  logInfo: jest.fn(),
  logWarn: jest.fn(),
  logError: jest.fn(),
  logHttp: jest.fn(),
  logDebug: jest.fn(),
};

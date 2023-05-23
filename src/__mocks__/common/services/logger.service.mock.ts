import { ILoggerService } from '@common/interfaces';

export const loggerServiceMock: ILoggerService = {
  logInfo: jest.fn(),
  logWarn: jest.fn(),
  logError: jest.fn(),
  logHttp: jest.fn(),
  logDebug: jest.fn(),
};

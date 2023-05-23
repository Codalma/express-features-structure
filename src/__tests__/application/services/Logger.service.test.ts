import { ILoggerService } from '@domain/services';
import { LoggerService } from '@application/services';
import { loggerServiceMock } from '@mocks/application/services/logger.service.mock';

describe('Scenario: Logging different levels of messages', () => {
  let loggerService: ILoggerService;

  beforeEach(() => {
    loggerService = LoggerService.getInstance(loggerServiceMock);
  });

  test('Given a logger service', () => {
    expect(loggerService).toBeDefined();
  });

  describe('When the logInfo method is called with a message "information"', () => {
    beforeEach(() => {
      loggerService.logInfo('information');
    });

    test('Then the logger should log the message with the logInfo method', () => {
      expect(loggerServiceMock.logInfo).toHaveBeenCalledTimes(1);
      expect(loggerServiceMock.logInfo).toHaveBeenCalledWith('information');
    });
  });

  describe('When the logWarn method is called with a message "warning"', () => {
    beforeEach(() => {
      loggerService.logWarn('warning');
    });

    test('Then the logger should log the message with the logWarn method', () => {
      expect(loggerServiceMock.logWarn).toHaveBeenCalledTimes(1);
      expect(loggerServiceMock.logWarn).toHaveBeenCalledWith('warning');
    });
  });

  describe('When the logError method is called with a message "error"', () => {
    beforeEach(() => {
      loggerService.logError('error');
    });

    test('Then the logger should log the message with the logError method', () => {
      expect(loggerServiceMock.logError).toHaveBeenCalledTimes(1);
      expect(loggerServiceMock.logError).toHaveBeenCalledWith('error');
    });
  });

  describe('When the logHttp method is called with a message "http"', () => {
    beforeEach(() => {
      loggerService.logHttp('http');
    });

    test('Then the logger should log the message with the logHttp method', () => {
      expect(loggerServiceMock.logHttp).toHaveBeenCalledTimes(1);
      expect(loggerServiceMock.logHttp).toHaveBeenCalledWith('http');
    });
  });

  describe('When the logDebug method is called with a message "debug"', () => {
    beforeEach(() => {
      loggerService.logDebug('debug');
    });

    test('Then the logger should log the message with the logDebug method', () => {
      expect(loggerServiceMock.logDebug).toHaveBeenCalledTimes(1);
      expect(loggerServiceMock.logDebug).toHaveBeenCalledWith('debug');
    });
  });
});

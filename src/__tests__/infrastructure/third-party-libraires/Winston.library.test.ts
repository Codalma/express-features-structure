import { WinstonLibrary } from '@infrastructure/libraries';
import { Logger } from 'winston';

describe('Scenario : Logging various levels of messages using Winston library', () => {
  const winstonLoggerMock = {
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    http: jest.fn(),
  } as unknown as Logger;

  describe('Given winston library is available', () => {
    // Arrange
    const winstonLibrary = WinstonLibrary.getInstance(winstonLoggerMock);

    describe('When logging an informational message', () => {
      test('Then it should be logged with the "info" level', () => {
        // Act
        const information = 'information';
        winstonLibrary.logInfo(information);

        // Assert
        expect(winstonLoggerMock.info).toHaveBeenCalledTimes(1);
        expect(winstonLoggerMock.info).toHaveBeenCalledWith(information);
      });
    });

    describe('When logging a warning message', () => {
      test('Then it should be logged with the "warn" level', () => {
        // Act
        const warning = 'warning';
        winstonLibrary.logWarn(warning);

        // Assert
        expect(winstonLoggerMock.warn).toHaveBeenCalledTimes(1);
        expect(winstonLoggerMock.warn).toHaveBeenCalledWith(warning);
      });
    });

    describe('When logging a debug message', () => {
      test('Then it should be logged with the "debug" level', () => {
        // Act
        const debug = 'debug';
        winstonLibrary.logDebug(debug);

        // Assert
        expect(winstonLoggerMock.debug).toHaveBeenCalledTimes(1);
        expect(winstonLoggerMock.debug).toHaveBeenCalledWith(debug);
      });
    });

    describe('When logging a http message', () => {
      test('Then it should be logged with the "http" level', () => {
        // Act
        const http = 'http';
        winstonLibrary.logHttp(http);

        // Assert
        expect(winstonLoggerMock.http).toHaveBeenCalledTimes(1);
        expect(winstonLoggerMock.http).toHaveBeenCalledWith(http);
      });
    });

    describe('When logging an error message', () => {
      test('Then it should be logged with the "error" level', () => {
        // Act
        const error = 'error';
        winstonLibrary.logError(error);

        // Assert
        expect(winstonLoggerMock.error).toHaveBeenCalledTimes(1);
        expect(winstonLoggerMock.error).toHaveBeenCalledWith(error);
      });
    });
  });
});

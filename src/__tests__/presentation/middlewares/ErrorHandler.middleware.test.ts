import { Request, Response, NextFunction } from 'express';
import { ErrorHandlerMiddleware } from '@presentation/middlewares';
import { loggerServiceMock } from '@mocks/application/services/logger.service.mock';
import { DomainError } from '@domain/exceptions';

describe('Scenario: Handling errors in Express middleware', () => {
  let reqMock: Request;
  let resMock: Response;
  let nextMock: NextFunction;

  beforeEach(() => {
    reqMock = jest.fn() as unknown as Request;
    resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    nextMock = jest.fn() as unknown as NextFunction;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Given an error handling middleware is available', () => {
    describe('When the error is an instance of DomainError', () => {
      // Arrange
      const errorCode = 400;
      const errorMessage = 'Domain error';
      const domainError = DomainError.badRequest(errorMessage);

      test('Then it should log the operational error', () => {
        // Act
        const errorHandler = new ErrorHandlerMiddleware(loggerServiceMock);
        errorHandler.execute(domainError, reqMock, resMock, nextMock);

        // Assert
        expect(loggerServiceMock.logError).toHaveBeenCalledTimes(1);
        expect(loggerServiceMock.logError).toHaveBeenCalledWith(
          `Operational error [${errorCode}]: ${errorMessage}`
        );
      });

      test('Then it should send an appropriate response with the error message and status code', () => {
        // Act
        const errorHandler = new ErrorHandlerMiddleware(loggerServiceMock);
        errorHandler.execute(domainError, reqMock, resMock, nextMock);

        // Assert
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.json).toHaveBeenCalledTimes(1);
        expect(resMock.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });

    describe('When the error is not an instance of DomainError', () => {
      // Arrange
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation();

      const errorCode = 500;
      const errorMessage = 'This is not a domain error.';
      const error = new Error(errorMessage);

      test('Then it should log the program error', () => {
        // Act
        const errorHandler = new ErrorHandlerMiddleware(loggerServiceMock);
        errorHandler.execute(error, reqMock, resMock, nextMock);

        // Assert
        expect(loggerServiceMock.logError).toHaveBeenCalledTimes(1);
        expect(loggerServiceMock.logError).toHaveBeenCalledWith(
          `Program error [${errorCode}]: ${errorMessage}`
        );
      });

      test('Then it should send a generic "Internal server error" response with a status code of 500', () => {
        // Act
        const errorHandler = new ErrorHandlerMiddleware(loggerServiceMock);
        errorHandler.execute(error, reqMock, resMock, nextMock);

        // Assert
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.json).toHaveBeenCalledTimes(1);
        expect(resMock.json).toHaveBeenCalledWith({
          message: 'Internal server error.',
        });
      });

      test('Then it should exit the process', () => {
        // Act
        const errorHandler = new ErrorHandlerMiddleware(loggerServiceMock);
        errorHandler.execute(error, reqMock, resMock, nextMock);

        // Assert
        expect(exitSpy).toHaveBeenCalledTimes(1);
        expect(exitSpy).toHaveBeenCalledWith(1);
      });
    });
  });
});
